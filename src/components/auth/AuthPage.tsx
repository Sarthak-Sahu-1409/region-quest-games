import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, Users, School, Star, Sparkles } from 'lucide-react';
import { User } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';

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
      <div 
        className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/gradient-blue-background/backg1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <ThemeToggle />
        
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

          <Card className="shadow-2xl border-2 border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/50 dark:bg-card/50  relative z-20">
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
                  className="w-full h-12 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                  className="w-full h-12 text-muted-foreground hover:text-foreground transition-colors duration-200 text-base"
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
    <div 
      className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/gradient-blue-background/backg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <ThemeToggle />
      
      <div className="w-full max-w-6xl relative z-20">
        {/* Professional Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-card/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-3 border-2 border-border/30">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground mb-2 leading-tight px-4">
            Learning Hub
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2 px-4">
            Transform education with interactive, region-specific learning experiences
          </p>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span>Trusted by educators nationwide</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Student Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/50 dark:bg-card/50  group">
            <CardHeader className="text-center space-y-3 pb-4 p-4">
              <div className="mx-auto w-14 h-14 bg-gradient-success rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-heading text-foreground mb-2">Student Portal</CardTitle>
                <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Embark on personalized learning adventures with interactive games, 
                  quizzes, and region-specific educational content.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></div>
                  <span>Interactive learning games</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></div>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></div>
                  <span>Regional content</span>
                </div>
              </div>
              <Button 
                onClick={handleStudentLogin}
                className="w-full h-12 bg-gradient-success hover:opacity-90 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Learning Journey
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/50 dark:bg-card/50  group">
            <CardHeader className="text-center space-y-3 pb-4 p-4">
              <div className="mx-auto w-14 h-14 bg-gradient-secondary rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-heading text-foreground mb-2">Educator Portal</CardTitle>
                <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Access comprehensive teaching tools and manage educational content 
                  with advanced insights amd answer keys.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Question review dashboard</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Content management</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                  <span>Regional oversight</span>
                </div>
              </div>
              <Button 
                onClick={() => setShowTeacherLogin(true)}
                className="w-full h-12 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Professional Footer */}
        <div className="text-center mt-6 space-y-2">
          <div className="flex items-center justify-center space-x-4 text-muted-foreground text-xs">
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