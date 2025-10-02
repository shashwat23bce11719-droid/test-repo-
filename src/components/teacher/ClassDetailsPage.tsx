import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Users, FileText, Calendar, Settings, Plus, MoveVertical as MoreVertical, BookOpen, Clock, CircleCheck as CheckCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';

export function ClassDetailsPage() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);

  const classData = {
    id: classId || '1',
    name: 'Grade 5 Mathematics',
    subject: 'Mathematics',
    section: 'Section A',
    room: 'Room 101',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    students: 28,
    teacher: 'Dr. Sarah Wilson',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80'
  };

  const students = [
    { id: 1, name: 'Alex Johnson', email: 'alex@school.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', attendance: 95 },
    { id: 2, name: 'Emma Davis', email: 'emma@school.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', attendance: 98 },
    { id: 3, name: 'Michael Brown', email: 'michael@school.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', attendance: 92 },
    { id: 4, name: 'Sophia Miller', email: 'sophia@school.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', attendance: 97 },
    { id: 5, name: 'James Wilson', email: 'james@school.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', attendance: 90 },
    { id: 6, name: 'Olivia Taylor', email: 'olivia@school.com', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80', attendance: 96 }
  ];

  const assignments = [
    { id: 1, title: 'Algebra Practice Worksheet', dueDate: 'Tomorrow, 11:59 PM', submitted: 18, total: 28, status: 'active' },
    { id: 2, title: 'Geometry Quiz', dueDate: 'Dec 25, 2024', submitted: 28, total: 28, status: 'completed' },
    { id: 3, title: 'Fractions Assessment', dueDate: 'Dec 30, 2024', submitted: 15, total: 28, status: 'active' }
  ];

  const announcements = [
    { id: 1, text: 'Quiz scheduled for next Monday on Algebra basics', time: '2 hours ago' },
    { id: 2, text: 'Please complete the worksheet by tomorrow', time: '1 day ago' },
    { id: 3, text: 'Great job on the last test everyone!', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/dashboard')}
          className="hover-scale magnetic-hover"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="relative h-48 rounded-2xl overflow-hidden shadow-2xl card-tilt hover-lift">
        <img
          src={classData.coverImage}
          alt={classData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg neon-glow">
            {classData.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
              {classData.subject}
            </Badge>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {classData.students} students
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {classData.schedule}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {classData.room}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="stream" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-effect shadow-lg">
              <TabsTrigger value="stream" className="btn-3d">Stream</TabsTrigger>
              <TabsTrigger value="assignments" className="btn-3d">Assignments</TabsTrigger>
              <TabsTrigger value="students" className="btn-3d">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="stream" className="space-y-4 mt-6">
              <Card className="glass-effect shadow-xl border-2 border-primary/20 card-tilt hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-lg">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Input
                          placeholder="Share something with your class..."
                          className="flex-1 glass-effect cursor-pointer hover:border-primary/50 transition-all shadow-md"
                          readOnly
                        />
                      </DialogTrigger>
                      <DialogContent className="glass-effect shadow-2xl">
                        <DialogHeader>
                          <DialogTitle className="animate-gradient-text">Post to Class</DialogTitle>
                          <DialogDescription>
                            Share announcements, resources, or updates with your students
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="What would you like to share?"
                            className="min-h-32 glass-effect focus:shadow-lg focus:shadow-primary/20"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" className="btn-3d glass-effect">Cancel</Button>
                            <Button className="btn-3d gradient-bg hover-glow">Post</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="glass-effect shadow-lg border border-primary/10 hover-lift card-tilt">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-md">
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" />
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{classData.teacher}</span>
                            <span className="text-sm text-muted-foreground">{announcement.time}</span>
                          </div>
                          <p className="text-foreground">{announcement.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4 mt-6">
              <div className="flex justify-end">
                <Dialog open={isAddingAssignment} onOpenChange={setIsAddingAssignment}>
                  <DialogTrigger asChild>
                    <Button className="btn-3d gradient-bg hover-glow shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-effect shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="animate-gradient-text">Create New Assignment</DialogTitle>
                      <DialogDescription>
                        Create a new assignment for your students
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input placeholder="Assignment title" className="glass-effect" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea placeholder="Assignment description" className="glass-effect" />
                      </div>
                      <div>
                        <Label>Due Date</Label>
                        <Input type="datetime-local" className="glass-effect" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" className="btn-3d glass-effect">Cancel</Button>
                        <Button className="btn-3d gradient-bg hover-glow">Create</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="glass-effect shadow-lg border border-primary/10 hover-lift card-tilt magnetic-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="h-12 w-12 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg btn-3d">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Due: {assignment.dueDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                {assignment.submitted}/{assignment.total} submitted
                              </span>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">
                                  {Math.round((assignment.submitted / assignment.total) * 100)}% complete
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
                                <div
                                  className="h-full gradient-bg-green transition-all duration-500 shadow-lg"
                                  style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={assignment.status === 'completed' ? 'default' : 'secondary'}
                          className="shadow-md"
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4 mt-6">
              <Card className="glass-effect shadow-lg border border-primary/10">
                <CardHeader className="border-b border-primary/10 bg-gradient-bg-subtle">
                  <CardTitle className="animate-gradient-text">Student Roster</CardTitle>
                  <CardDescription>
                    {students.length} students enrolled in this class
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10 glass-effect hover-lift transition-all shadow-md magnetic-hover"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-lg">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Attendance</p>
                            <p className="text-lg font-bold text-primary">{student.attendance}%</p>
                          </div>
                          <Button variant="ghost" size="sm" className="btn-3d hover-glow">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="glass-effect shadow-xl border-2 border-primary/20 card-tilt hover-lift">
            <CardHeader className="border-b border-primary/10 bg-gradient-bg-subtle">
              <CardTitle className="animate-gradient-text">Class Code</CardTitle>
              <CardDescription>Share this code with students</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-muted rounded-lg p-4 text-center shadow-inner">
                <span className="text-3xl font-bold font-mono gradient-bg px-4 py-2 rounded-lg text-white shadow-lg">
                  {classData.id?.toUpperCase() || 'MATH101'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect shadow-xl border-2 border-primary/20 card-tilt hover-lift">
            <CardHeader className="border-b border-primary/10 bg-gradient-bg-subtle">
              <CardTitle className="animate-gradient-text">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-bg-subtle shadow-md">
                <span className="text-sm font-medium">Total Students</span>
                <span className="text-2xl font-bold text-primary">{classData.students}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-bg-subtle shadow-md">
                <span className="text-sm font-medium">Active Assignments</span>
                <span className="text-2xl font-bold text-primary">
                  {assignments.filter(a => a.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-bg-subtle shadow-md">
                <span className="text-sm font-medium">Avg Attendance</span>
                <span className="text-2xl font-bold text-primary">94%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect shadow-xl border-2 border-primary/20 card-tilt hover-lift">
            <CardHeader className="border-b border-primary/10 bg-gradient-bg-subtle">
              <CardTitle className="animate-gradient-text">Class Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-2">
              <Button variant="outline" className="w-full justify-start btn-3d glass-effect hover-glow" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Class Details
              </Button>
              <Button variant="outline" className="w-full justify-start btn-3d glass-effect hover-glow" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </Button>
              <Button variant="outline" className="w-full justify-start btn-3d glass-effect hover-glow" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
