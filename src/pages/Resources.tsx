
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Book, FileText2, FileVideo, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resources = [
  {
    id: 1,
    type: 'article',
    title: 'The Power of Mentorship',
    description: 'Discover why mentorship is key to growth and success in your career.',
    link: 'https://www.example.com/article1'
  },
  {
    id: 2,
    type: 'video',
    title: 'Career Growth Strategies - Webinar',
    description: 'Watch this session to learn roadmaps from successful professionals.',
    link: 'https://www.example.com/video1'
  },
  {
    id: 3,
    type: 'link',
    title: 'Resume Review Checklist',
    description: 'Download this checklist before your mentor session.',
    link: 'https://www.example.com/checklist'
  },
  {
    id: 4,
    type: 'article',
    title: 'Networking for Beginners',
    description: 'Tips and tricks to start networking in any industry.',
    link: 'https://www.example.com/article2'
  },
  {
    id: 5,
    type: 'video',
    title: 'Mentor Q&A Session',
    description: 'Mentors answer real-world questions from mentees.',
    link: 'https://www.example.com/video2'
  },
];

const typeToIcon = {
  article: Book,
  video: FileVideo,
  link: LinkIcon,
};

const typeTabs = [
  { value: "all", label: "All" },
  { value: "article", label: "Articles" },
  { value: "video", label: "Videos" },
  { value: "link", label: "Links" },
];

const Resources: React.FC = () => {
  const [tab, setTab] = React.useState("all");
  const filtered = tab === "all" ? resources : resources.filter(r => r.type === tab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
            Resources for <span className="text-transparent bg-clip-text bg-gradient-to-r from-mentor-500 to-learner-500">Growth</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Curated articles, videos, and guides to help you succeed in your mentorship journey.
          </p>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mx-auto flex justify-center mb-8">
              {typeTabs.map((tabItem) => (
                <TabsTrigger key={tabItem.value} value={tabItem.value}>
                  {tabItem.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {typeTabs.map((tabItem) => (
              <TabsContent
                key={tabItem.value}
                value={tabItem.value}
                className="mt-0"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {filtered.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500">No resources found.</div>
                  )}
                  {filtered.map((resource) => {
                    const Icon = typeToIcon[resource.type as keyof typeof typeToIcon] || FileText2;
                    return (
                      <Card key={resource.id} className="hover:shadow-xl transition">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="bg-mentor-100 text-mentor-500 rounded-full p-3">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                          <Button
                            asChild
                            className="bg-learner-500 text-white hover:bg-learner-600"
                          >
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resource
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
