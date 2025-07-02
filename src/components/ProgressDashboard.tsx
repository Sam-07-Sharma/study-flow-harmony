
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, CheckSquare, Target, Calendar, BookOpen } from 'lucide-react';

const ProgressDashboard = () => {
  // Mock data - in a real app, this would come from your state management
  const studyStats = {
    todayStudyTime: 3.5, // hours
    weeklyGoal: 25, // hours
    weeklyProgress: 15.5, // hours
    completedTasks: 8,
    totalTasks: 12,
    pomodoroSessions: 14,
    streak: 5 // days
  };

  const recentAchievements = [
    { title: 'Study Streak Master', description: '5 days in a row!', icon: '🔥' },
    { title: 'Task Completionist', description: 'Completed 10 tasks this week', icon: '✅' },
    { title: 'Pomodoro Pro', description: '20 focus sessions completed', icon: '🍅' }
  ];

  const upcomingTasks = [
    { title: 'Complete Chapter 5 Reading', due: 'Today', priority: 'high' },
    { title: 'Math Problem Set #3', due: 'Tomorrow', priority: 'medium' },
    { title: 'History Essay Draft', due: '2 days', priority: 'high' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back to StudyFlow! 👋
        </h2>
        <p className="text-gray-600">
          Here's your study progress and upcoming tasks
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Today's Study Time</p>
                <p className="text-2xl font-bold text-blue-900">
                  {studyStats.todayStudyTime}h
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-900">
                  {studyStats.completedTasks}/{studyStats.totalTasks}
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Pomodoro Sessions</p>
                <p className="text-2xl font-bold text-orange-900">
                  {studyStats.pomodoroSessions}
                </p>
              </div>
              <div className="bg-orange-600 p-3 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Study Streak</p>
                <p className="text-2xl font-bold text-purple-900">
                  {studyStats.streak} days
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Study Goal</CardTitle>
            <CardDescription>
              {studyStats.weeklyProgress} of {studyStats.weeklyGoal} hours completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress 
                value={(studyStats.weeklyProgress / studyStats.weeklyGoal) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{studyStats.weeklyProgress}h completed</span>
                <span>{studyStats.weeklyGoal - studyStats.weeklyProgress}h remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rate</CardTitle>
            <CardDescription>
              You're doing great! Keep up the momentum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress 
                value={(studyStats.completedTasks / studyStats.totalTasks) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{studyStats.completedTasks} completed</span>
                <span>{studyStats.totalTasks - studyStats.completedTasks} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements and Upcoming Tasks */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏆</span>
              <span>Recent Achievements</span>
            </CardTitle>
            <CardDescription>Celebrate your wins!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Tasks</span>
            </CardTitle>
            <CardDescription>Stay on top of your priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-gray-500">Due: {task.due}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
