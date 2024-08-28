import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, List, ListItem, ListItemText, TextField, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { backend } from 'declarations/backend';

interface Note {
  id: bigint;
  category: string | null;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await backend.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await backend.getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddNote = async () => {
    if (newNoteContent.trim() !== '') {
      try {
        await backend.createNote(selectedCategory, newNoteContent);
        setNewNoteContent('');
        fetchNotes();
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        await backend.addCategory(newCategory);
        setNewCategory('');
        fetchCategories();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Jeff's Notes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItem
                  button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  selected={selectedCategory === category}
                >
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddCategory}
                sx={{ mt: 1 }}
              >
                Add Category
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <List>
              {notes
                .filter((note) => !selectedCategory || note.category === selectedCategory)
                .map((note) => (
                  <ListItem key={note.id.toString()}>
                    <ListItemText
                      primary={note.content}
                      secondary={note.category || 'Uncategorized'}
                    />
                  </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="New Note"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddNote}
                sx={{ mt: 1 }}
              >
                Add Note
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setNewNoteContent('')}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default App;
