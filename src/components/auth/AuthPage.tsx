import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, Users, School, Star, Sparkles } from 'lucide-react';
import { User } from '@/types';
import { PAGE_BACKGROUND_STYLE } from '@/lib/styles';
import Loader from '@/components/Loader';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const navigate = useNavigate();
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pendingAwareness, setPendingAwareness] = useState(false);

  const handleAwarenessClick = () => {
    // Preload all frames into browser cache during the 1 s loader window
    for (let i = 1; i <= 112; i++) {
      const img = new Image();
      img.src = `/scroll-animation/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
    }
    setPendingAwareness(true);
  };

  useEffect(() => {
    if (!pendingAwareness) return;
    const t = setTimeout(() => navigate('/awareness'), 1000);
    return () => clearTimeout(t);
  }, [pendingAwareness, navigate]);

  if (pendingAwareness) return <Loader />;

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
        className="h-[100dvh] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden"
        style={PAGE_BACKGROUND_STYLE}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        <div className="w-full max-w-lg relative z-20">
          {/* Professional Header */}
          <div className="text-center mb-3">
            <div className="mx-auto w-12 h-12 bg-card/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 border-2 border-border/30 shadow-inner">
              <School className="w-6 h-6 text-white drop-shadow-md" />
            </div>
            <h1 className="text-xl sm:text-2xl font-heading text-foreground mb-1">
              Educator Portal
            </h1>
            <p className="text-muted-foreground text-xs">
              Secure access for certified educators
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 relative z-20 card-glossy">
            <CardHeader className="text-center space-y-2 pb-3 p-3">
              <div className="mx-auto w-12 h-12 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl font-heading text-foreground mb-1">Welcome Back</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Sign in to access your teaching dashboard
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6 pb-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="teacherId" className="text-xs font-medium text-foreground">Educator ID</Label>
                  <Input
                    id="teacherId"
                    type="text"
                    placeholder="Enter your educator ID"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="h-9 text-sm border-2 focus:border-primary/50 transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-medium text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-9 text-sm border-2 focus:border-primary/50 transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-destructive text-xs bg-destructive/10 p-2 rounded-lg border-2 border-destructive/20 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-destructive rounded-full"></div>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 pt-1">
                <Button 
                  onClick={handleTeacherLogin} 
                  className="w-full h-10 bg-gradient-secondary hover:opacity-90 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                  className="w-full h-10 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  ← Back to Main Portal
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Professional Footer */}
          <div className="text-center mt-3 text-muted-foreground text-xs">
            <p>Secured learning management system</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-[100dvh] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden"
      style={PAGE_BACKGROUND_STYLE}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      <div className="w-full max-w-6xl relative z-20">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1
            className="font-heading font-bold tracking-tight flex items-center justify-center gap-3 mb-3"
            style={{ fontSize: 'clamp(2.1rem, 6vw, 4.8rem)', lineHeight: 1.05 }}
          >
            <span className="text-white drop-shadow-lg">भाषा</span>
            <span
              style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
            >
              Quest
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-3 px-4">
            Interactive region-specific learning experiences
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/20 backdrop-blur-sm rounded-full border border-border/40 text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 drop-shadow-md" />
            <span className="font-medium text-white drop-shadow-sm">Trusted by educators</span>
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 drop-shadow-md" />
          </div>
        </header>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Student Card */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 group card-glossy card-glossy-hover">
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
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 group card-glossy card-glossy-hover">
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
        <div className="text-center mt-6">
          {/* SVG filters for hand-drawn effect — hidden, rendered once */}
          <svg height="0" width="0" style={{ position: 'absolute' }}>
            <filter id="handDrawnNoise">
              <feTurbulence result="noise" numOctaves={8} baseFrequency={0.1} type="fractalNoise" />
              <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={1.5} in2="noise" in="SourceGraphic" />
            </filter>
            <filter id="handDrawnNoise2">
              <feTurbulence result="noise" numOctaves={8} baseFrequency={0.1} seed={1010} type="fractalNoise" />
              <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={1.5} in2="noise" in="SourceGraphic" />
            </filter>
            <filter id="handDrawnNoiset">
              <feTurbulence result="noise" numOctaves={8} baseFrequency={0.1} type="fractalNoise" />
              <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={3} in2="noise" in="SourceGraphic" />
            </filter>
            <filter id="handDrawnNoiset2">
              <feTurbulence result="noise" numOctaves={8} baseFrequency={0.1} seed={1010} type="fractalNoise" />
              <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={3} in2="noise" in="SourceGraphic" />
            </filter>
          </svg>

          <button className="hand-drawn-btn" onClick={handleAwarenessClick}>
            {/* Quill / feather icon */}
            <svg
              className="hdb-cosm"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="128" height="128"
              viewBox="0 0 256 256"
            >
              <path d="M243.07324,157.43945c-1.2334-1.47949-23.18847-27.34619-60.46972-41.05859-1.67579-17.97412-8.25293-34.36328-18.93653-46.87158C149.41309,52.8208,128.78027,44,104,44,54.51074,44,22.10059,88.57715,20.74512,90.4751a3.99987,3.99987,0,0,0,6.50781,4.65234C27.5625,94.6958,58.68359,52,104,52c22.36816,0,40.89648,7.85107,53.584,22.70508,8.915,10.437,14.65625,23.9541,16.65528,38.894A133.54185,133.54185,0,0,0,136,108c-25.10742,0-46.09473,6.48486-60.69434,18.75391-12.65234,10.63379-19.91015,25.39355-19.91015,40.49463a43.61545,43.61545,0,0,0,12.69336,31.21923C76.98438,207.3208,89.40234,212,104,212c23.98047,0,44.37305-9.4668,58.97461-27.37744,12.74512-15.6333,20.05566-37.145,20.05566-59.01953,0-.1128-.001-.22559-.001-.33838,33.62988,13.48486,53.62207,36.96631,53.89746,37.2959a4.00015,4.00015,0,0,0,6.14648-5.1211ZM104,204c-27.89746,0-40.60449-19.05078-40.60449-36.75146C63.39551,142.56592,86.11621,116,136,116a124.37834,124.37834,0,0,1,38.97266,6.32617q.05712,1.63038.05761,3.27686C175.03027,177.07129,139.29785,204,104,204Z" />
            </svg>
            {/* Yellow highlighter SVG overlay */}
            <svg className="hdb-highlight" viewBox="0 0 144.75738 77.18431" preserveAspectRatio="none">
              <g transform="translate(-171.52826,-126.11624)">
                <g fill="none" strokeWidth="17" strokeLinecap="round" strokeMiterlimit="10">
                  <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336 37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
                </g>
              </g>
            </svg>
            Why Language Matters
          </button>
          <div className="text-muted-foreground text-xs leading-relaxed max-w-2xl mx-auto px-4 mt-6">
            Developed by Sarthak Sahu, Sameer Godara and Sarthak Goel under the guidance of Professor Dripta Piplai (Mondal)
          </div>
          <div className="text-muted-foreground/70 text-xs mt-2">
            Developed with love at IIT Kharagpur ❤️
          </div>
        </div>
      </div>
    </div>
  );
};
