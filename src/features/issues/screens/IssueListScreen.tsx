import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useIssueStore } from "../store/issueStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../shared/hooks/useTheme";
import { RefreshControl } from "react-native";
import { Card } from "../../../shared/components/Card";
import { Badge } from "../../../shared/components/Badge";
import { tokens } from "../../../shared/theme/tokens";
import { Input } from "../../../shared/components/Input";
import { FilterChip } from "../../../shared/components/FilterChip";
import { IssuePriority, IssueStatus } from "../types";
import EmptyState from "../../../shared/components/state/EmptyState";
import LoadingState from "../../../shared/components/state/LoadingState";
import ErrorState from "../../../shared/components/state/ErrorState";

const IssueListScreen = () => {
  const { palette } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { issues, loadIssues, syncQueue, retrySyncQueue, isLoading, error } =
    useIssueStore();

  type StatusFilter = "All" | IssueStatus;
  type PriorityFilter = "All" | IssuePriority;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);

      // fake API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (syncQueue.length > 0) {
        await retrySyncQueue();
      }

      // reload issues from SQLite
      await loadIssues();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  //search and filter
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");

  const filteredIssues = issues.filter((issue) => {
    const searchMatches = issue.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatches =
      statusFilter === "All" || issue.status === statusFilter;

    const priorityMatches =
      priorityFilter === "All" || issue.priority === priorityFilter;

    return searchMatches && statusMatches && priorityMatches;
  });

  useFocusEffect(
    useCallback(() => {
      loadIssues();
    }, []),
  );
  if (isLoading === true && issues.length === 0) {
    return <LoadingState />;
  }

  if (error != null) {
    return <ErrorState message={error} onRetry={loadIssues} />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <View
        style={{
          marginBottom: tokens.spacing.xl,
        }}
      >
        {/* HEADER ROW */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              fontSize: tokens.fontSizes.xxl,
              fontWeight: tokens.fontWeights.bold,
              color: palette.text,
            }}
          >
            Issues
          </Text>

          <Text
            onPress={onRefresh}
            style={{
              color: palette.primary,
              fontWeight: "600",
            }}
          >
            Refresh
          </Text>
        </View>
      </View>

      <Input
        value={search}
        onChangeText={setSearch}
        placeholder="Search Issues..."
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {["All", "Open", "In Progress", "Resolved", "Closed"].map((item) => (
          <FilterChip
            key={item}
            label={item}
            selected={statusFilter === item}
            onPress={() => setStatusFilter(item as StatusFilter)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {["All", "Low", "Medium", "High"].map((item) => (
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
          setSearch("");
          setStatusFilter("All");
          setPriorityFilter("All");
        }}
        style={{
          color: palette.primary,
          marginTop: 10,
          fontWeight: "600",
        }}
      >
        Clear Filters
      </Text>

      <FlatList
        data={filteredIssues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: tokens.spacing.md,
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.primary}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("IssueDetails", { id: item.id })}
          >
            <Card>
              <Text
                style={{
                  ...tokens.typography.subtitle,
                  color: palette.text,
                  marginBottom: 6,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ color: palette.textMuted, marginBottom: 6 }}>
                Priority: {item.priority}
              </Text>
              <Badge label={item.status} type="info" />
              <Text
                style={{
                  marginTop: 8,
                  color: palette.textMuted,
                  fontSize: tokens.fontSizes.xs,
                }}
              >
                CreatedAt: {item.createdAt}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<EmptyState message="No issues found" />}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateIssue" as never)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: palette.primary,
          justifyContent: "center",
          alignItems: "center",
          ...tokens.shadows.lg,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "300",
            lineHeight: 32,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default IssueListScreen;
