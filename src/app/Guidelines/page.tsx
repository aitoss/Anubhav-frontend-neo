import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Guidelines = () => {
  return (
    <>
      <div className="h-16 md:h-8"></div>
      <div className="flex flex-col items-center min-h-full">
        <section className="mx-auto w-[100%] h-full max-w-[1400px] lg:w-[70%] px-4 py-8 overflow-y-auto">
          <div className="text-xl text-foreground">
            <BlurFade delay={0.05}>
              <h1 className="text-4xl lg:py-8 font-semibold text-center text-foreground">
                Guidelines
              </h1>
            </BlurFade>
            <BlurFade delay={0.07}>
              <p>
                Anubhav, the experience sharing platform, welcomes contributions
                from anyone at AIT to support others on their journey to the
                next interview. It offers a wealth of articles and resources
                specifically tailored to college placements and interview
                experiences.
              </p>
            </BlurFade>
            <br />
            <BlurFade delay={0.1}>
              <h2 className="text-foreground text-2xl lg:pb-4 font-semibold">
                Reviewing Process:
              </h2>
            </BlurFade>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <BlurFade delay={0.12}>
                <Card className="md:h-36">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <CardTitle>Share Experience</CardTitle>
                    </div>
                    <CardDescription>
                      Share your interview experience in the write-article section.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
              <BlurFade delay={0.14}>
                <Card className="md:h-36">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <CardTitle>Submit Article</CardTitle>
                    </div>
                    <CardDescription>
                      Submit your article. After submission, it will go for verification. Verification is just a small process to filter out spam articles.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
              <BlurFade delay={0.16}>
                <Card className="md:h-36">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <CardTitle>Go Live</CardTitle>
                    </div>
                    <CardDescription>
                      After verification, it will be available on our platform for others to read and learn from.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
            </div>
            <BlurFade delay={0.17}>
              <h2 className="text-foreground text-2xl lg:pt-8 lg:pb-4 font-semibold">
                How to write Article:
              </h2>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="py-2">
                We&apos;ve created a user-friendly and straightforward article
                writing section. To ensure a clear understanding of how to use
                it, please refer to the following points:
              </p>
            </BlurFade>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
              <BlurFade delay={0.22}>
                <Card className="md:h-44">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <CardTitle>Basic Info</CardTitle>
                    </div>
                    <CardDescription>
                      Enter basic information like your name, company name, offered position, and email address.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
              <BlurFade delay={0.24}>
                <Card className="md:h-44">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <CardTitle>Write Article</CardTitle>
                    </div>
                    <CardDescription>
                      Write the article in the editor which offers a variety of features including headings, code blocks, formatting, emojis, images, and more.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
              <BlurFade delay={0.26}>
                <Card className="md:h-44">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <CardTitle>Add Tags</CardTitle>
                    </div>
                    <CardDescription>
                      Add relevant tags related to your company and field to help others find your article.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
              <BlurFade delay={0.28}>
                <Card className="md:h-44">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <CardTitle>Submit</CardTitle>
                    </div>
                    <CardDescription>
                      Click the submit button to send your article for spam check (verification step).
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Guidelines;
