
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, BookOpen } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  subject: string;
  type: 'study' | 'exam' | 'assignment' | 'break';
  day: string;
}

const StudySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Mathematics Study Session',
      time: '09:00',
      duration: '2 hours',
      subject: 'Calculus',
      type: 'study',
      day: 'monday'
    },
    {
      id: '2',
      title: 'History Essay Writing',
      time: '11:30',
      duration: '1.5 hours',
      subject: 'World History',
      type: 'assignment',
      day: 'monday'
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      time: '14:00',
      duration: '1 hour',
      subject: 'Physics',
      type: 'assignment',
      day: 'tuesday'
    },
    {
      id: '4',
      title: 'Chemistry Exam',
      time: '10:00',
      duration: '2 hours',
      subject: 'Organic Chemistry',
      type: 'exam',
      day: 'wednesday'
    }
  ]);

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const getTypeColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'study': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-purple-100 text-purple-800';
      case 'break': return 'bg-green-100 text-green-800';
    }
  };

  const getTypeIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'study': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <Calendar className="h-4 w-4" />;
      case 'assignment': return <Clock className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
    }
  };

  const todayEvents = events.filter(event => event.day === selectedDay);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Week Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
          <CardDescription>Plan and organize your study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {days.map(day => {
              const dayEvents = events.filter(e => e.day === day.key);
              return (
                <Button
                  key={day.key}
                  variant={selectedDay === day.key ? 'default' : 'outline'}
                  onClick={() => setSelectedDay(day.key)}
                  className="flex flex-col h-20 p-2"
                >
                  <span className="font-medium text-sm">{day.label}</span>
                  <span className="text-xs opacity-70">{dayEvents.length} events</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Events */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{selectedDay} Schedule</CardTitle>
              <CardDescription>
                {todayEvents.length} events scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No events scheduled for this day</p>
                    <Button className="mt-4" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                ) : (
                  todayEvents
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(event => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-lg">{event.time}</span>
                                <Badge variant="outline">{event.duration}</Badge>
                              </div>
                              
                              <h3 className="font-semibold mb-1">{event.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">{event.subject}</p>
                              
                              <Badge className={getTypeColor(event.type)}>
                                {getTypeIcon(event.type)}
                                <span className="ml-1 capitalize">{event.type}</span>
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Study Sessions</span>
                <span className="font-semibold text-blue-600">
                  {events.filter(e => e.type === 'study').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Assignments</span>
                <span className="font-semibold text-purple-600">
                  {events.filter(e => e.type === 'assignment').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Exams</span>
                <span className="font-semibold text-red-600">
                  {events.filter(e => e.type === 'exam').length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Study Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Exam
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Add Assignment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySchedule;
