import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { difference } from 'lodash';
admin.initializeApp();

// When a category is deleted also delete it's subcategories
exports.onCategoryDelete = functions.firestore.document('top-level-categories/{categoryId}').onDelete(async (snap, context) => {
  const categoryId = context.params.categoryId;
  const deletePromises: Promise<FirebaseFirestore.WriteResult>[] = [];

  const subcategories = await admin.firestore().collection('subcategories').where('parent', '==', categoryId).get();
  subcategories.forEach(documentSnapshot => {
    deletePromises.push(documentSnapshot.ref.delete());
  });

  return Promise.all(deletePromises);
});

exports.onGroupUpdate = functions.firestore.document('subcategories/{subcategoryId}/groups/{groupId}').onUpdate(async (change, context) => {
  const subcategoryId = context.params.subcategoryId;
  const groupId = context.params.groupId;
  const oldWords = Object.keys(change.before.data().words);
  const newWords = Object.keys(change.after.data().words);
  const deletedWords = difference(oldWords, newWords);
  const updatePromises: Promise<FirebaseFirestore.WriteResult>[] = [];

  if(deletedWords.length) {
    const exercises = await admin.firestore().collection('subcategories').doc(subcategoryId).collection('groups').doc(groupId).collection('exercises').get();
    exercises.forEach(documentSnapshot => {
      const exerciseQuestions = documentSnapshot.data().questions;
      deletedWords.forEach((word: string) => {
        delete exerciseQuestions[word];
      })
      updatePromises.push(documentSnapshot.ref.update({ questions: exerciseQuestions }));
    });
  }

  return Promise.all(updatePromises);
});
