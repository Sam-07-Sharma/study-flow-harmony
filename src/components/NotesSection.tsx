
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, BookOpen, Trash2, Edit } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Calculus - Derivatives',
      content: 'Key formulas for derivatives:\n\n1. Power Rule: d/dx(x^n) = nx^(n-1)\n2. Product Rule: d/dx(uv) = u\'v + uv\'\n3. Chain Rule: d/dx(f(g(x))) = f\'(g(x)) × g\'(x)\n\nPractice problems: Complete exercises 1-15 on page 142.',
      subject: 'Mathematics',
      tags: ['calculus', 'derivatives', 'formulas'],
      createdAt: '2024-07-01',
      updatedAt: '2024-07-02'
    },
    {
      id: '2',
      title: 'World War II - Key Events',
      content: 'Important dates and events:\n\n• 1939: Germany invades Poland, war begins\n• 1941: Pearl Harbor attack, US enters war\n• 1944: D-Day landings in Normandy\n• 1945: Germany surrenders, atomic bombs dropped\n\nEssay topic: Analyze the impact of WWII on global politics.',
      subject: 'History',
      tags: ['wwii', 'timeline', 'essay'],
      createdAt: '2024-06-30',
      updatedAt: '2024-07-01'
    },
    {
      id: '3',
      title: 'Organic Chemistry - Functional Groups',
      content: 'Common functional groups to memorize:\n\n1. Alcohols (-OH)\n2. Aldehydes (-CHO)\n3. Ketones (C=O)\n4. Carboxylic acids (-COOH)\n5. Amines (-NH2)\n\nNaming conventions and reaction mechanisms are crucial for the midterm.',
      subject: 'Chemistry',
      tags: ['organic', 'functional-groups', 'midterm'],
      createdAt: '2024-06-29',
      updatedAt: '2024-06-30'
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    subject: '',
    tags: ''
  });

  const [newNoteForm, setNewNoteForm] = useState({
    title: '',
    content: '',
    subject: '',
    tags: ''
  });
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setEditForm({
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags.join(', ')
    });
    setIsEditing(true);
  };

  const saveEditedNote = () => {
    if (selectedNote) {
      const updatedNote: Note = {
        ...selectedNote,
        title: editForm.title,
        content: editForm.content,
        subject: editForm.subject,
        tags: editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setNotes(notes.map(note => 
        note.id === selectedNote.id ? updatedNote : note
      ));
      setSelectedNote(updatedNote);
      setIsEditing(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const createNewNote = () => {
    if (newNoteForm.title.trim() && newNoteForm.content.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: newNoteForm.title,
        content: newNoteForm.content,
        subject: newNoteForm.subject || 'General',
        tags: newNoteForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setNotes([newNote, ...notes]);
      setNewNoteForm({ title: '', content: '', subject: '', tags: '' });
      setShowNewNoteForm(false);
      setSelectedNote(newNote);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 h-screen max-h-[800px]">
        {/* Notes List */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Notes</CardTitle>
                <Button 
                  onClick={() => setShowNewNoteForm(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {filteredNotes.map(note => (
                  <Card 
                    key={note.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedNote?.id === note.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm line-clamp-1">{note.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {note.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {note.subject}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredNotes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notes found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note Editor/Viewer */}
        <div className="md:col-span-2">
          {showNewNoteForm ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
                <CardDescription>Add a new note to your collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNoteForm.title}
                  onChange={(e) => setNewNoteForm({ ...newNoteForm, title: e.target.value })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Subject"
                    value={newNoteForm.subject}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, subject: e.target.value })}
                  />
                  <Input
                    placeholder="Tags (comma-separated)"
                    value={newNoteForm.tags}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, tags: e.target.value })}
                  />
                </div>
                
                <Textarea
                  placeholder="Write your note content here..."
                  value={newNoteForm.content}
                  onChange={(e) => setNewNoteForm({ ...newNoteForm, content: e.target.value })}
                  className="min-h-64 resize-none"
                />
                
                <div className="flex space-x-2">
                  <Button onClick={createNewNote} className="bg-blue-600 hover:bg-blue-700">
                    Save Note
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowNewNoteForm(false);
                      setNewNoteForm({ title: '', content: '', subject: '', tags: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedNote ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {isEditing ? (
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="text-xl font-semibold"
                        />
                      ) : (
                        selectedNote.title
                      )}
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Input
                            placeholder="Subject"
                            value={editForm.subject}
                            onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                          />
                          <Input
                            placeholder="Tags (comma-separated)"
                            value={editForm.tags}
                            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                          />
                        </div>
                      ) : (
                        <>
                          <Badge variant="secondary" className="mr-2">
                            {selectedNote.subject}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Updated: {new Date(selectedNote.updatedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button onClick={saveEditedNote} size="sm">
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => handleEditNote(selectedNote)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-6">
                {isEditing ? (
                  <Textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="min-h-96 resize-none font-mono text-sm"
                  />
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {selectedNote.content}
                    </pre>
                  </div>
                )}
                
                {!isEditing && selectedNote.tags.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Select a note to view
                </h3>
                <p className="text-gray-500">
                  Choose a note from the list or create a new one
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
