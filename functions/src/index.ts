import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateCategoryData, UpdateCategoryData, DeleteCategoryData } from './models';
admin.initializeApp();

export const addTopLevelCategory = functions.https.onCall((data: CreateCategoryData, context: functions.https.CallableContext) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can add top level categories'
    );
  }

  return admin.firestore().collection('top-level-categories').doc().set({
    text: data.name,
    subcategories: []
  });
});

export const updateTopLevelCategory = functions.https.onCall((data: UpdateCategoryData, context: functions.https.CallableContext) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can edit top level categories'
    );
  }

  return admin.firestore().collection('top-level-categories').doc(data.id).update({
    text: data.name
  });
});

export const deleteTopLevelCategory = functions.https.onCall((data: DeleteCategoryData, context: functions.https.CallableContext) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can edit top level categories'
    );
  }

  return admin.firestore().collection('top-level-categories').doc(data.id).delete();
});
