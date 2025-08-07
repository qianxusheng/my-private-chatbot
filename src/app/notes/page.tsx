'use client'

import { useState, useEffect } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'

interface Note {
  id: string
  title: string
  content: string
  tags: string | null
  createdAt: string
  updatedAt: string
}

interface NotesResponse {
  notes: Note[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' })

  useEffect(() => {
    fetchNotes()
  }, [search])

  const fetchNotes = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      
      const response = await fetch(`/api/notes?${params}`)
      const data: NotesResponse = await response.json()
      setNotes(data.notes)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert('Please fill in title and content')
      return
    }

    try {
      const tags = newNote.tags.split(',').map(t => t.trim()).filter(t => t)
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          tags: tags.length > 0 ? tags : null,
        }),
      })

      if (response.ok) {
        setNewNote({ title: '', content: '', tags: '' })
        setShowCreateModal(false)
        fetchNotes()
      }
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const parseTags = (tagsString: string | null): string[] => {
    if (!tagsString) return []
    try {
      return JSON.parse(tagsString)
    } catch {
      return []
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FiPlus /> New Note
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                
                {parseTags(note.tags).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parseTags(note.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Created {formatDate(note.createdAt)}
                  {note.updatedAt !== note.createdAt && (
                    <span> · Updated {formatDate(note.updatedAt)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {notes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes yet</p>
            <p className="text-gray-400 mt-2">Click the button above to create your first note</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Note</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newNote.title}
                    onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter note content..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newNote.tags}
                    onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="AI, learning, thoughts..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={createNote}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}