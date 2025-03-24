
import React from 'react';
import { Header } from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { estimateVocabularySize } from '@/utils/wordUtils';
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  UserCircle, 
  Bell, 
  Globe, 
  Palette, 
  BarChart 
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  // Stats for the vocabulary estimation
  const knownWords = 150; // Placeholder, in a real app this would come from user data
  const estimatedVocab = estimateVocabularySize(knownWords, 'intermediate');
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your vocabulary learning experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 card-shadow">
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-bold text-center">User Profile</h2>
                <p className="text-muted-foreground text-center">Intermediate Learner</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Vocabulary Size</h3>
                    <span className="text-primary font-bold">{estimatedVocab}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated based on {knownWords} words you've mastered.
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Daily Streak</h3>
                    <span className="text-primary font-bold">3 days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep learning daily to build your streak!
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  View detailed statistics
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="learning" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Learning</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage your account and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Language</label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto save progress</p>
                        <p className="text-sm text-muted-foreground">Automatically save your learning progress.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sync across devices</p>
                        <p className="text-sm text-muted-foreground">Keep your progress synced on all devices.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage when and how you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Daily reminder</p>
                        <p className="text-sm text-muted-foreground">Remind you to practice every day.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly summary</p>
                        <p className="text-sm text-muted-foreground">Send weekly progress report.</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New word notifications</p>
                        <p className="text-sm text-muted-foreground">Notify when new words are available.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize how the app looks.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Theme</label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Font Size</label>
                      <Slider defaultValue={[2]} max={4} step={1} className="py-4" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Card animations</p>
                        <p className="text-sm text-muted-foreground">Enable flip animations for word cards.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="learning" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Settings</CardTitle>
                    <CardDescription>Customize your learning experience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Words per session</label>
                      <Select defaultValue="10">
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 words</SelectItem>
                          <SelectItem value="10">10 words</SelectItem>
                          <SelectItem value="15">15 words</SelectItem>
                          <SelectItem value="20">20 words</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Learning pace</label>
                      <Slider defaultValue={[2]} max={4} step={1} className="py-4" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Slow</span>
                        <span>Medium</span>
                        <span>Fast</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Review strategy</label>
                      <Select defaultValue="forgetting-curve">
                        <SelectTrigger>
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alphabetical">Alphabetical</SelectItem>
                          <SelectItem value="random">Random</SelectItem>
                          <SelectItem value="forgetting-curve">Forgetting Curve</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-play pronunciation</p>
                        <p className="text-sm text-muted-foreground">Automatically play word pronunciation.</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
