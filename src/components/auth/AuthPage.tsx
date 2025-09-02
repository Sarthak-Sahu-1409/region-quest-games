import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-large">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-heading">Teacher Login</CardTitle>
            <CardDescription>
              Enter your teacher credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacherId">Teacher ID</Label>
              <Input
                id="teacherId"
                type="text"
                placeholder="Enter your teacher ID"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-3">
              <Button 
                onClick={handleTeacherLogin} 
                className="w-full bg-gradient-secondary hover:opacity-90 text-white font-semibold py-6"
              >
                Login as Teacher
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowTeacherLogin(false)}
                className="w-full"
              >
                Back to Main
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-heading text-white mb-4">
            Learning Adventure
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Embark on an educational journey tailored to your region. 
            Choose your learning path and start exploring!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Student</CardTitle>
              <CardDescription>
                Start your learning journey with region-specific games and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleStudentLogin}
                className="w-full bg-gradient-success hover:opacity-90 text-white font-semibold py-6 text-lg"
              >
                Enter as Student
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Teacher</CardTitle>
              <CardDescription>
                Access teaching tools and monitor student progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowTeacherLogin(true)}
                className="w-full bg-gradient-secondary hover:opacity-90 text-white font-semibold py-6 text-lg"
              >
                Login as Teacher
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};