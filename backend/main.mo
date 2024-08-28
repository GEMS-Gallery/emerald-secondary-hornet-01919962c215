import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  // Types
  type Note = {
    id: Nat;
    category: ?Text;
    content: Text;
  };

  // Stable variables
  stable var nextNoteId: Nat = 0;
  stable var notesEntries: [(Nat, Note)] = [];
  stable var categoriesArray: [Text] = [];

  // Initialize HashMap from stable variable
  let notes = HashMap.fromIter<Nat, Note>(notesEntries.vals(), 0, Nat.equal, Nat.hash);
  var categories : [Text] = categoriesArray;

  // Helper functions
  func noteToEntry(note: Note): (Nat, Note) {
    (note.id, note)
  };

  // CRUD operations for notes
  public func createNote(category: ?Text, content: Text) : async Nat {
    let id = nextNoteId;
    let note: Note = { id; category; content };
    notes.put(id, note);
    nextNoteId += 1;
    id
  };

  public query func readNote(id: Nat) : async Result.Result<Note, Text> {
    switch (notes.get(id)) {
      case (null) { #err("Note not found") };
      case (?note) { #ok(note) };
    }
  };

  public func updateNote(id: Nat, content: Text) : async Result.Result<(), Text> {
    switch (notes.get(id)) {
      case (null) { #err("Note not found") };
      case (?note) {
        let updatedNote: Note = {
          id = note.id;
          category = note.category;
          content = content;
        };
        notes.put(id, updatedNote);
        #ok()
      };
    }
  };

  public func deleteNote(id: Nat) : async Result.Result<(), Text> {
    switch (notes.remove(id)) {
      case (null) { #err("Note not found") };
      case (?_) { #ok() };
    }
  };

  public query func getNotes() : async [Note] {
    Iter.toArray(notes.vals())
  };

  // Category operations
  public func addCategory(category: Text) : async Result.Result<(), Text> {
    if (Array.find<Text>(categories, func(c) { c == category }) != null) {
      #err("Category already exists")
    } else {
      categories := Array.append<Text>(categories, [category]);
      #ok()
    }
  };

  public query func getCategories() : async [Text] {
    categories
  };

  // Upgrade hooks
  system func preupgrade() {
    notesEntries := Iter.toArray(notes.entries());
    categoriesArray := categories;
  };

  system func postupgrade() {
    notesEntries := [];
    categoriesArray := [];
  };
}
