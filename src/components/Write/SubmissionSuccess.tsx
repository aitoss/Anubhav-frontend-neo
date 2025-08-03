import React from "react";
import { CheckCircle, ArrowRight, Home, FileText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SubmissionSuccessProps {
  onReset: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ onReset }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Article Submitted Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for contributing to our community! Your article has been submitted for review. 
          We'll notify you once it's been approved and published.
        </p>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Our team will review your article within 2-3 business days</li>
            <li>• You'll receive an email notification about the review status</li>
            <li>• Once approved, your article will be published on our platform</li>
            <li>• You'll get another notification when it goes live</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Write Another Article
          </Button>
          
          <Link href="/" className="flex-1">
            <Button className="w-full flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Have questions about the review process?{" "}
            <a href="/guidelines" className="text-blue-600 hover:text-blue-800 underline">
              Check our guidelines
            </a>{" "}
            or{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
