
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Timer, CheckSquare, StickyNote, TrendingUp } from 'lucide-react';

interface WelcomePageProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

const WelcomePage = ({ onLogin }: WelcomePageProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: 'Study User', email: loginData.email });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: signupData.name, email: signupData.email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            StudyFlow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your ultimate study companion. Boost productivity with Pomodoro timers, task management, and smart scheduling.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Timer className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Pomodoro Timer</h3>
              <p className="text-sm text-gray-600">Focus sessions with breaks</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Task Management</h3>
              <p className="text-sm text-gray-600">Organize your study tasks</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <StickyNote className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Notes</h3>
              <p className="text-sm text-gray-600">Capture and organize ideas</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-gray-600">Monitor your study habits</p>
            </CardContent>
          </Card>
        </div>

        {/* Login/Signup Form */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Get Started</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your study dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
