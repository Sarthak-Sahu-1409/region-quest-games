import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, Users, School, Star, Sparkles } from 'lucide-react';
import { User } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedBackground } from '@/components/AnimatedBackground';

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
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
        <AnimatedBackground />
        <ThemeToggle />
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
        
        <div className="w-full max-w-lg relative z-20">
          {/* Professional Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-card/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border-2 border-border/30">
              <School className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-foreground mb-1.5 sm:mb-2">
              Educator Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Secure access for certified educators
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75 relative z-20">
            <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 p-4 sm:p-6">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-heading text-foreground mb-1.5 sm:mb-2">Welcome Back</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Sign in to access your teaching dashboard
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-8 pb-6 sm:pb-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="teacherId" className="text-sm font-medium text-foreground">Educator ID</Label>
                  <Input
                    id="teacherId"
                    type="text"
                    placeholder="Enter your educator ID"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-destructive text-xs sm:text-sm bg-destructive/10 p-3 sm:p-4 rounded-lg border-2 border-destructive/20 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-destructive rounded-full"></div>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 sm:space-y-4 pt-2">
                <Button 
                  onClick={handleTeacherLogin} 
                  className="w-full h-10 sm:h-12 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                  className="w-full h-10 sm:h-12 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm sm:text-base"
                >
                  ← Back to Main Portal
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Professional Footer */}
          <div className="text-center mt-6 sm:mt-8 text-muted-foreground text-xs sm:text-sm">
            <p>Secured learning management system</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      <AnimatedBackground />
      <ThemeToggle />
      {/* Background decoration */}
      <div className="absolute top-20 left-20 opacity-10 hidden md:block">
        <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-10 hidden md:block">
        <Star className="w-10 h-10 md:w-12 md:h-12 text-primary animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="absolute top-40 right-16 opacity-10 hidden md:block">
        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="w-full max-w-6xl relative z-20">
        {/* Professional Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-card/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 border-2 border-border/30">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight px-4">
            Learning Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-2 sm:mb-3 md:mb-4 px-4">
            Transform education with interactive, region-specific learning experiences
          </p>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-xs sm:text-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            <span>Trusted by educators nationwide</span>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75 group">
            <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 p-4 sm:p-6">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-success rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-heading text-foreground mb-2 sm:mb-3">Student Portal</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Embark on personalized learning adventures with interactive games, 
                  quizzes, and region-specific educational content.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0"></div>
                  <span>Interactive learning games</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0"></div>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0"></div>
                  <span>Regional content</span>
                </div>
              </div>
              <Button 
                onClick={handleStudentLogin}
                className="w-full h-11 sm:h-14 bg-gradient-success hover:opacity-90 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Learning Journey
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75 group">
            <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 p-4 sm:p-6">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-secondary rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-heading text-foreground mb-2 sm:mb-3">Educator Portal</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Access comprehensive teaching tools and manage educational content 
                  with advanced insights.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Question review dashboard</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Content management</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Regional oversight</span>
                </div>
              </div>
              <Button 
                onClick={() => setShowTeacherLogin(true)}
                className="w-full h-11 sm:h-14 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Professional Footer */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-muted-foreground text-xs sm:text-sm">
            <span>Secure • Reliable • Educational</span>
          </div>
          <div className="text-muted-foreground/70 text-xs">
            © 2024 Learning Hub. Empowering education through technology.
          </div>
        </div>
      </div>
    </div>
  );
};