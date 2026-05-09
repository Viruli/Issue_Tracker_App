import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportIssuesToJSON = async (
  issues: any[]
) => {
  try {
    const json = JSON.stringify(
      issues,
      null,
      2
    );

    const file = new FileSystem.File(
      FileSystem.Paths.document,
      'issues-export.json'
    );

    await file.write(json);

    await Sharing.shareAsync(file.uri);
  } catch (error) {
    console.log('Export failed:', error);
  }
};