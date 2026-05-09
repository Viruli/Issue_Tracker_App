import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useIssueStore } from '../store/issueStore'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../shared/hooks/useTheme';

import { Card } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { tokens } from '../../../shared/theme/tokens';
import { Input } from '../../../shared/components/Input';
import { FilterChip } from '../../../shared/components/FilterChip';
import { IssuePriority, IssueStatus } from '../types';
import { exportIssuesToJSON } from '../../../shared/utils/exportIssues';

const IssueListScreen = () => {
  const { palette, toggleTheme, mode } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {issues , loadIssues} = useIssueStore();

  type StatusFilter = 'All' | IssueStatus;
  type PriorityFilter = 'All' | IssuePriority;

  //search and filter
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');
  

  const filteredIssues = issues.filter(issue => {
    const searchMatches = issue.title.toLowerCase().includes(search.toLowerCase());

    const statusMatches = statusFilter === 'All' || issue.status === statusFilter;

    const priorityMatches = priorityFilter === 'All' || issue.priority === priorityFilter;

    return searchMatches && statusMatches && priorityMatches;
  })

useFocusEffect(
  useCallback(() => {
    loadIssues();
  }, [])
);

  return (
    <View style={{flex:1, backgroundColor: palette.background, padding:16}}>
      <View style={{padding: tokens.spacing.md}}></View>
        <Text style={{...tokens.typography.title, color: palette.text}}>Issues</Text>
        <Text style={{color:palette.textMuted}}>Total Issues: {issues.length}</Text>
        <View style={sectionCard(palette)}>
  <Text
    style={{
      color: palette.text,
      fontSize: tokens.fontSizes.md,
      fontWeight:
        tokens.fontWeights.semibold,
      marginBottom: tokens.spacing.sm,
    }}
  >
    Export Issues
  </Text>

  <Text
    style={{
      color: palette.textMuted,
      marginBottom: tokens.spacing.md,
    }}
  >
    Share all issues as a JSON file
  </Text>

  <Button
    title="Export JSON"
    onPress={() =>
      exportIssuesToJSON(issues)
    }
  />
</View>

      <Input value={search} onChangeText={setSearch} placeholder="Search Issues..."/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((item) => (
    <FilterChip
      key={item}
      label={item}
      selected={statusFilter === item}
      onPress={() => setStatusFilter(item as StatusFilter)}
    />
  ))}
</ScrollView>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
  {['All', 'Low', 'Medium', 'High'].map((item) => (
    <FilterChip
      key={item}
      label={item}
      selected={priorityFilter === item}
      onPress={() => setPriorityFilter(item as PriorityFilter)}
    />
  ))}
</ScrollView>

<Text
  onPress={() => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
  }}
  style={{
    color: palette.primary,
    marginTop: 10,
    fontWeight: '600',
  }}
>
  Clear Filters
</Text>
      
      <FlatList
        data={filteredIssues}
        keyExtractor={(item) => item.id}
        contentContainerStyle= {{padding: tokens.spacing.md, paddingBottom:100,}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('IssueDetails', { id: item.id })
            }
          >
            <Card>
              <Text style={{...tokens.typography.subtitle, color:palette.text, marginBottom:6}}>{item.title}</Text>
              <Text style={{ color: palette.textMuted, marginBottom: 6 }}>Priority: {item.priority}</Text>
              <Badge label={item.status} type="info" />
              <Text style={{marginTop: 8, color: palette.textMuted, fontSize: tokens.fontSizes.xs,}}>CreatedAt: {item.createdAt}</Text>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ color: palette.textMuted }}>
              No issues found
            </Text>
          </View>
        }
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateIssue' as never)}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: palette.primary,
          justifyContent: 'center',
          alignItems: 'center',
          ...tokens.shadows.lg,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: '300',
            lineHeight: 32,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default IssueListScreen

const sectionCard = (palette: any) => ({
  backgroundColor: palette.surface,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  marginBottom: tokens.spacing.lg,
  borderWidth: 1,
  borderColor: palette.border,
});