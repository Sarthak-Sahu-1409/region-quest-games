import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, Users, School, Star, Sparkles } from 'lucide-react';
import { User } from '@/types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleStudentLogin = () => {
    onLogin({ type: 'student' });
  };

  const handleTeacherLogin = () => {
    if (teacherId === 'TEACHER123' && password === 'IITKGP') {
      onLogin({ type: 'teacher' });
    } else {
      setError('Invalid credentials. Please check your ID and password.');
    }
  };

  if (showTeacherLogin) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 opacity-20">
          <Star className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <Sparkles className="w-6 h-6 text-white animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <School className="w-12 h-12 text-white animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="w-full max-w-lg">
          {/* Professional Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
              <School className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-heading text-white mb-2">
              Educator Portal
            </h1>
            <p className="text-white/80 text-sm">
              Secure access for certified educators
            </p>
          </div>

          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-heading text-foreground mb-2">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to access your teaching dashboard and student analytics
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacherId" className="text-sm font-medium text-foreground">Educator ID</Label>
                  <Input
                    id="teacherId"
                    type="text"
                    placeholder="Enter your educator ID"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-destructive text-sm bg-destructive/10 p-4 rounded-lg border border-destructive/20 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-destructive rounded-full"></div>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 pt-2">
                <Button 
                  onClick={handleTeacherLogin} 
                  className="w-full h-12 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Access Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setShowTeacherLogin(false);
                    setError('');
                    setTeacherId('');
                    setPassword('');
                  }}
                  className="w-full h-12 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  ← Back to Main Portal
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Professional Footer */}
          <div className="text-center mt-8 text-white/60 text-sm">
            <p>Secured learning management system</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 opacity-10">
        <BookOpen className="w-16 h-16 text-white animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-10">
        <Star className="w-12 h-12 text-white animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="absolute top-40 right-16 opacity-10">
        <Sparkles className="w-10 h-10 text-white animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="w-full max-w-6xl">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-white/20">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-heading text-white mb-6 leading-tight">
            Learning Hub
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
            Transform education with interactive, region-specific learning experiences
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/70 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by educators nationwide</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-0 backdrop-blur-sm bg-white/95 group">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-success rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-heading text-foreground mb-3">Student Portal</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Embark on personalized learning adventures with interactive games, 
                  quizzes, and region-specific educational content designed for your success.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Interactive learning games</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Regional content</span>
                </div>
              </div>
              <Button 
                onClick={handleStudentLogin}
                className="w-full h-14 bg-gradient-success hover:opacity-90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning Journey
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-0 backdrop-blur-sm bg-white/95 group">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-secondary rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-heading text-foreground mb-3">Educator Portal</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Access comprehensive teaching tools, monitor student progress, 
                  and manage educational content with advanced analytics and insights.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Student analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Content management</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Performance tracking</span>
                </div>
              </div>
              <Button 
                onClick={() => setShowTeacherLogin(true)}
                className="w-full h-14 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Professional Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center space-x-8 text-white/60 text-sm">
            <span>Secure • Reliable • Educational</span>
          </div>
          <div className="text-white/40 text-xs">
            © 2024 Learning Hub. Empowering education through technology.
          </div>
        </div>
      </div>
    </div>
  );
};