
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = mode === 'work' ? workDuration * 60 : breakDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished - switch modes
      setIsActive(false);
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(breakDuration * 60);
      } else {
        setMode('work');
        setTimeLeft(workDuration * 60);
      }
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive, timeLeft, mode, workDuration, breakDuration]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            {mode === 'work' ? (
              <>
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span>Focus Session</span>
              </>
            ) : (
              <>
                <Coffee className="h-6 w-6 text-green-600" />
                <span>Break Time</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {mode === 'work' ? 'Time to focus and be productive!' : 'Take a well-deserved break!'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-6xl font-mono font-bold text-center">
            <span className={mode === 'work' ? 'text-blue-600' : 'text-green-600'}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Progress Bar */}
          <Progress 
            value={progress} 
            className="h-3"
          />

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`${
                mode === 'work' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Mode Switcher */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={mode === 'work' ? 'default' : 'outline'}
              onClick={() => switchMode('work')}
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Work
            </Button>
            <Button
              variant={mode === 'break' ? 'default' : 'outline'}
              onClick={() => switchMode('break')}
              size="sm"
            >
              <Coffee className="h-4 w-4 mr-1" />
              Break
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Timer Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Work Duration (minutes)</label>
              <Select 
                value={workDuration.toString()} 
                onValueChange={(value) => setWorkDuration(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="25">25 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Break Duration (minutes)</label>
              <Select 
                value={breakDuration.toString()} 
                onValueChange={(value) => setBreakDuration(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
