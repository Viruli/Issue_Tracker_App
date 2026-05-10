import { View, Text, ScrollView, Switch } from "react-native";
import React, { useCallback } from "react";

import { useTheme } from "../../../shared/hooks/useTheme";
import { useIssueStore } from "../store/issueStore";
import { tokens } from "../../../shared/theme/tokens";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "../../../shared/components/Button";
import { exportIssuesToJSON } from "../../../shared/utils/exportIssues";
import ErrorState from "../../../shared/components/state/ErrorState";
import LoadingState from "../../../shared/components/state/LoadingState";

const DashboardScreen = () => {
  const { palette, mode, toggleTheme } = useTheme();
  const {
    getIssueStats,
    issues,
    syncQueue,
    retrySyncQueue,
    loadIssues,
    error,
    isLoading,
  } = useIssueStore();

  const stats = getIssueStats();

  useFocusEffect(
    useCallback(() => {
      loadIssues();
    }, []),
  );

  if (isLoading === true && issues.length === 0) {
    return <LoadingState />;
  }

  if (error != null) {
    return <ErrorState message={error} onRetry={retrySyncQueue} />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background,
      }}
      contentContainerStyle={{
        padding: tokens.spacing.md,
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          marginBottom: tokens.spacing.xl,
        }}
      >
        <Text
          style={{
            fontSize: tokens.fontSizes.xxl,
            fontWeight: tokens.fontWeights.bold,
            color: palette.text,
            marginBottom: 6,
          }}
        >
          Dashboard
        </Text>

        <Text
          style={{
            color: palette.textMuted,
            fontSize: tokens.fontSizes.sm,
          }}
        >
          Overview of your issue tracking system
        </Text>
      </View>

      {/* SUMMARY CARDS */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: tokens.spacing.xl,
        }}
      >
        {/* ALL */}
        <View style={summaryCard(palette)}>
          <Text style={summaryLabel(palette)}>All Issues</Text>

          <Text style={summaryValue(palette)}>{stats.all}</Text>
        </View>

        {/* OPEN */}
        <View style={summaryCard(palette)}>
          <Text style={summaryLabel(palette)}>Open</Text>

          <Text style={[summaryValue(palette), { color: palette.primary }]}>
            {stats.open}
          </Text>
        </View>

        {/* IN PROGRESS */}
        <View style={summaryCard(palette)}>
          <Text style={summaryLabel(palette)}>In Progress</Text>

          <Text style={[summaryValue(palette), { color: palette.warning }]}>
            {stats.inProgress}
          </Text>
        </View>

        {/* RESOLVED */}
        <View style={summaryCard(palette)}>
          <Text style={summaryLabel(palette)}>Resolved</Text>

          <Text style={[summaryValue(palette), { color: palette.success }]}>
            {stats.resolved}
          </Text>
        </View>
      </View>

      {/* APPEARANCE */}
      <View style={sectionCard(palette)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: palette.text,
                fontSize: tokens.fontSizes.md,
                fontWeight: tokens.fontWeights.semibold,
              }}
            >
              Dark Mode
            </Text>

            <Text
              style={{
                color: palette.textMuted,
                marginTop: 4,
                fontSize: tokens.fontSizes.sm,
              }}
            >
              Toggle application theme
            </Text>
          </View>

          <Switch value={mode === "dark"} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={sectionCard(palette)}>
        <Text
          style={{
            color: palette.text,
            fontSize: tokens.fontSizes.md,
            fontWeight: tokens.fontWeights.semibold,
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
          onPress={() => exportIssuesToJSON(issues)}
        />
      </View>

      <View style={sectionCard(palette)}>
        <Text
          style={{
            color: palette.text,
            fontSize: tokens.fontSizes.md,
            fontWeight: tokens.fontWeights.semibold,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Offline Sync
        </Text>

        <Text
          style={{
            color: palette.textMuted,
            marginBottom: tokens.spacing.md,
          }}
        >
          Pending Queue: {syncQueue.length}
        </Text>

        <Button
          title="Retry Sync"
          onPress={retrySyncQueue}
          disabled={syncQueue.length === 0}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const summaryCard = (palette: any) => ({
  width: "48%" as const,
  backgroundColor: palette.surface,
  padding: tokens.spacing.md,
  borderRadius: tokens.radii.lg,
  marginBottom: tokens.spacing.md,
  borderWidth: 1,
  borderColor: palette.border,
});

const summaryLabel = (palette: any) => ({
  color: palette.textMuted,
  fontSize: tokens.fontSizes.sm,
  marginBottom: 8,
});

const summaryValue = (palette: any) => ({
  fontSize: tokens.fontSizes.xxl,
  fontWeight: tokens.fontWeights.bold,
  color: palette.text,
});

const sectionCard = (palette: any) => ({
  backgroundColor: palette.surface,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  marginBottom: tokens.spacing.lg,
  borderWidth: 1,
  borderColor: palette.border,
});
