"use client";
import React from "react";
import { Calendar, Clock, Mail, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[200px] text-gray-500">
      Loading preview...
    </div>
  )
});

// Simple Badge component
const Badge: React.FC<{ children: React.ReactNode; variant?: "default" | "secondary" | "outline"; className?: string }> = ({ 
  children, 
  variant = "default", 
  className = "" 
}) => {
  const variants = {
    default: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white"
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface PreviewSubmitProps {
  authorData: {
    authorName: string;
    authorEmail: string;
    authorLinkedIn?: string;
    authorTwitter?: string;
  };
  contentData: {
    title: string;
    position: string;
    companyName: string;
  };
  tags: string[];
  article: string;
}

const PreviewSubmit: React.FC<PreviewSubmitProps> = ({ 
  authorData, 
  contentData, 
  tags, 
  article 
}) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = () => {
    const words = article.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="flex w-full justify-center pt-4">
      <div className="relative flex flex-col gap-6 rounded-xl pb-4 md:w-full md:gap-4 md:p-5 xs:p-0">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121] mb-2">
            Preview & Submit
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Review your article before submitting it for publication
          </p>
        </div>

        {/* Article Preview */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Article Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {calculateReadingTime()}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {contentData.title}
            </h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Author Info */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mt-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {authorData.authorName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{authorData.authorName}</h3>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs">{authorData.authorEmail}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {contentData.position} at {contentData.companyName}
                </p>
                {(authorData.authorLinkedIn || authorData.authorTwitter) && (
                  <div className="flex items-center gap-3">
                    {authorData.authorLinkedIn && (
                      <a 
                        href={authorData.authorLinkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        LinkedIn
                      </a>
                    )}
                    {authorData.authorTwitter && (
                      <a 
                        href={authorData.authorTwitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Twitter/X
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none">
              {article ? (
                <ReactQuill
                  value={article}
                  readOnly
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              ) : (
                <p className="text-gray-500 italic">No content written yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-900 mb-2">📋 Before You Submit</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Ensure your article follows our <a href="/guidelines" target="_blank" className="underline">community guidelines</a></li>
            <li>• Check that all information is accurate and up-to-date</li>
            <li>• Verify that code examples are tested and working</li>
            <li>• Review for spelling and grammar errors</li>
            <li>• Make sure your content is original and adds value to the community</li>
          </ul>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {article.trim().split(/\s+/).filter(word => word.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">{article.length}</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">{tags.length}</div>
            <div className="text-sm text-gray-600">Tags</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">{calculateReadingTime()}</div>
            <div className="text-sm text-gray-600">Reading Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSubmit;
