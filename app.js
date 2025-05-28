class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.noteInput = document.getElementById('note-input');
        this.addButton = document.getElementById('add-note');
        this.notesList = document.getElementById('notes-list');
        this.offlineStatus = document.getElementById('offline-status');

        this.init();
    }

    init() {
        this.addButton.addEventListener('click', () => this.addNote());
        this.renderNotes();
        this.setupOfflineDetection();
    }

    setupOfflineDetection() {
        window.addEventListener('online', () => {
            this.offlineStatus.classList.add('hidden');
        });

        window.addEventListener('offline', () => {
            this.offlineStatus.classList.remove('hidden');
        });

        // Проверяем начальное состояние
        if (!navigator.onLine) {
            this.offlineStatus.classList.remove('hidden');
        }
    }

    addNote() {
        const content = this.noteInput.value.trim();
        if (!content) return;

        const note = {
            id: Date.now(),
            content,
            createdAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.noteInput.value = '';
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    renderNotes() {
        this.notesList.innerHTML = '';
        
        this.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            
            const content = document.createElement('div');
            content.className = 'note-content';
            content.textContent = note.content;
            
            const actions = document.createElement('div');
            actions.className = 'note-actions';
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => this.deleteNote(note.id));
            
            actions.appendChild(deleteButton);
            noteElement.appendChild(content);
            noteElement.appendChild(actions);
            
            this.notesList.appendChild(noteElement);
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
}); 