import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useIssueStore } from '../store/issueStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../shared/hooks/useTheme';
import { tokens } from '../../../shared/theme/tokens';

import { Card } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { useConfirm } from '../../../shared/hooks/useComponent';

type Props = NativeStackScreenProps<
  MainStackParamList,
  'IssueDetails'
>;



const IssueDetailsScreen = ({route, navigation }: Props) => {
  const { palette } = useTheme();
  const {confirm} = useConfirm();
  const {id} = route.params;
  const {issue, viewIssue, deleteIssue, updateIssue} = useIssueStore();

  useEffect(() => {
    setTimeout(() => {
  viewIssue(id);
}, 100);
  }, [id]);

  const markAsResolved = () => {
  confirm({
    message: 'Mark this issue as Resolved?',
    onConfirm: () => {
      updateIssue(id, { status: 'Resolved' });
      viewIssue(id);
    },
  });
};

const markAsClosed = () => {
  confirm({
    message: 'Mark this issue as Closed?',
    onConfirm: () => {
      updateIssue(id, { status: 'Closed' });
      viewIssue(id);
    },
  });
};

const markAsOpen = () => {
  confirm({
    message: 'Are you sure you need to Reopen this issue',
    onConfirm: () => {
      updateIssue(id, { status: 'Open' });
      viewIssue(id);
    },
  });
};

const handleDelete = () => {
  confirm({
    message: 'Are you sure you want to delete this issue?',
    confirmText: 'Delete',
    onConfirm: () =>{
      deleteIssue(id);
      navigation.goBack();
    } 
  });
};

  if (!issue) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: palette.background,
        }}
      >
        <Text style={{ color: palette.text }}>
          Loading issue...
        </Text>
      </View>
    );
  }

  return (
  <View
    style={{
      flex: 1,
      backgroundColor: palette.background,
    }}
  >
    <ScrollView
      contentContainerStyle={{
        padding: tokens.spacing.md,
        paddingBottom: 120,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          ...tokens.typography.title,
          color: palette.text,
          marginBottom: 12,
        }}
      >
        {issue.title}
      </Text>

      {/* BADGES */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Badge label={issue.status} type="info" />

        <Badge
          label={issue.priority}
          type={
            issue.priority === 'High'
              ? 'danger'
              : issue.priority === 'Medium'
              ? 'warning'
              : 'success'
          }
        />
      </View>

      {/* DESCRIPTION */}
      <Card>
        <Text
          style={{
            ...tokens.typography.subtitle,
            color: palette.text,
            marginBottom: 10,
          }}
        >
          Description
        </Text>

        <Text
          style={{
            color: palette.textMuted,
            lineHeight: 22,
          }}
        >
          {issue.description || 'No description provided'}
        </Text>
      </Card>
      {/* META INFO */}
      <Card>
        <Text style={{ color: palette.text, marginBottom: 10 }}>
          Assignee:
        </Text>

        <Text style={{ color: palette.textMuted, marginBottom: 16 }}>
          {issue.assignee || 'Unassigned'}
        </Text>

        <Text style={{ color: palette.text, marginBottom: 10 }}>
          Created At:
        </Text>

        <Text style={{ color: palette.textMuted }}>
          {new Date(issue.createdAt).toLocaleString()}
        </Text>
      </Card>

      {issue.imageUri ? (
  <Card>
    <Text
      style={{
        color: palette.text,
        marginBottom: 10,
      }}
    >
      Attachment
    </Text>

    <Image
      source={{ uri: issue.imageUri }}
      style={{
        width: '100%',
        height: 220,
        borderRadius: tokens.radii.lg,
      }}
      resizeMode="cover"
    />
  </Card>
) : null}

      {/* ACTIONS (FIXED) */}
      <Card>
        <Text
          style={{
            fontWeight: '600',
            fontSize: tokens.fontSizes.md,
            color: palette.text,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Actions
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.sm,
          }}
        >
          {(issue.status == 'Open' || issue.status == 'In Progress') && (
            <TouchableOpacity
              onPress={markAsResolved}
              style={{
                flex: 1,
                backgroundColor: palette.success,
                paddingVertical: 10,
                borderRadius: tokens.radii.md,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Mark Resolved
              </Text>
            </TouchableOpacity>
          )}

          {(issue.status == 'Open' || issue.status == 'In Progress') && (
            <TouchableOpacity
              onPress={markAsClosed}
              style={{
                flex: 1,
                backgroundColor: palette.warning,
                paddingVertical: 10,
                borderRadius: tokens.radii.md,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Mark Closed
              </Text>
            </TouchableOpacity>
          )}

          {(issue.status == 'Resolved' || issue.status == 'Closed') && (
            <TouchableOpacity
              onPress={markAsOpen}
              style={{
                flex: 1,
                backgroundColor: palette.primary,
                paddingVertical: 10,
                borderRadius: tokens.radii.md,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                ReOpen
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </ScrollView>

    {/* BOTTOM ACTION BAR */}
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: tokens.spacing.md,
        backgroundColor: palette.background,
        borderTopWidth: 1,
        borderTopColor: palette.border,
        gap: 10,
      }}
    >
      <Button
        title="Edit Issue"
        onPress={() =>
          navigation.navigate('EditIssue', { id })
        }
      />

      <Button
        title="Delete Issue"
        onPress={() => {
          handleDelete();
        }}
        style={{
          backgroundColor: palette.danger,
        }}
      />
    </View>
  </View>
);
  
}

export default IssueDetailsScreen