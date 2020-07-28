import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
  const subcategoryId = context.params.problemId;
  const groupId = context.params.groupId;
  const oldWords = Object.keys(change.before.data().words);
  const beforeWords = Object.keys(change.after.data().words);

  console.log(oldWords, beforeWords);

  // const exercises = await admin.firestore().collection('subcategories').doc(subcategoryId).collection('groups').doc(groupId).collection('exercises').get();
  // exercises.forEach(documentSnapshot => {
  //   documentSnapshot.id;
  // });
});
