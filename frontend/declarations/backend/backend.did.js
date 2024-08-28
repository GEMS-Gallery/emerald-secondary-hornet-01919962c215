export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Note = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'category' : IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({ 'ok' : Note, 'err' : IDL.Text });
  return IDL.Service({
    'addCategory' : IDL.Func([IDL.Text], [Result], []),
    'createNote' : IDL.Func([IDL.Opt(IDL.Text), IDL.Text], [IDL.Nat], []),
    'deleteNote' : IDL.Func([IDL.Nat], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getNotes' : IDL.Func([], [IDL.Vec(Note)], ['query']),
    'readNote' : IDL.Func([IDL.Nat], [Result_1], ['query']),
    'updateNote' : IDL.Func([IDL.Nat, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
