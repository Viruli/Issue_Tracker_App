import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useIssueStore } from "../store/issueStore";
import { MainStackParamList } from "../../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IssuePriority, IssueStatus } from "../types";
import uuid from "react-native-uuid";
import { tokens } from "../../../shared/theme/tokens";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { useTheme } from "../../../shared/hooks/useTheme";
import * as ImagePicker from "expo-image-picker";

type createProps = NativeStackScreenProps<MainStackParamList, "CreateIssue">;

type editProps = NativeStackScreenProps<MainStackParamList, "EditIssue">;

type Props = createProps | editProps;

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"] as const;

const priorityOptions = ["Low", "Medium", "High"] as const;

const CreateIssueScreen = ({ route, navigation }: Props) => {
  const { palette } = useTheme();
  const isEdit = route.name === "EditIssue";
  const issueId = route.params?.id;
  const { addIssue, viewIssue, issue, updateIssue } = useIssueStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IssueStatus>("Open");
  const [priority, setPriority] = useState<IssuePriority>("Low");
  const [assignee, setAssignee] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [titleError, setTitleError] = useState("");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (isEdit && issueId) {
      viewIssue(issueId);
    }
  }, [issueId]);

  useEffect(() => {
    if (isEdit && issue) {
      setTitle(issue.title);
      setDescription(issue.description ?? "");
      setStatus(issue.status);
      setPriority(issue.priority);
      setAssignee(issue.assignee ?? "");
      setImageUri(issue.imageUri ?? "");
    }
  }, [issue]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    setTitleError("");

    if (isEdit && issueId) {
      updateIssue(issueId, {
        title,
        description,
        status,
        priority,
        assignee,
        imageUri,
      });
    } else {
      addIssue({
        id: uuid.v4().toString(),
        title,
        description,
        status,
        priority,
        assignee,
        createdAt: new Date().toISOString(),
        imageUri,
      });
    }
    navigation.goBack();
  };
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
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            ...tokens.typography.title,
            color: palette.text,
            marginBottom: tokens.spacing.lg,
          }}
        >
          {isEdit ? "Edit Issue" : "Create Issue"}
        </Text>

        <Input
          label="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);

            if (text.trim()) {
              setTitleError("");
            }
          }}
          placeholder="Enter issue title"
        />

        {titleError ? (
          <Text
            style={{
              color: palette.danger,
              marginTop: -8,
              marginBottom: 12,
              fontSize: 13,
            }}
          >
            {titleError}
          </Text>
        ) : null}

        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the issue"
        />

        <Text
          style={{
            color: palette.text,
            marginBottom: 10,
            marginTop: 10,
            fontWeight: "600",
          }}
        >
          Status
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: tokens.spacing.lg,
          }}
        >
          {statusOptions.map((item) => {
            const active = status === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setStatus(item)}
                style={{
                  backgroundColor: active ? palette.primary : palette.surface,

                  borderWidth: 1,
                  borderColor: active ? palette.primary : palette.border,

                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: tokens.radii.full,
                }}
              >
                <Text
                  style={{
                    color: active ? "#fff" : palette.text,
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text
          style={{
            color: palette.text,
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          Priority
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: tokens.spacing.lg,
          }}
        >
          {priorityOptions.map((item) => {
            const active = priority === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setPriority(item)}
                style={{
                  backgroundColor: active ? palette.primary : palette.surface,

                  borderWidth: 1,
                  borderColor: active ? palette.primary : palette.border,

                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: tokens.radii.full,
                }}
              >
                <Text
                  style={{
                    color: active ? "#fff" : palette.text,
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Input
          label="Assignee"
          value={assignee}
          onChangeText={setAssignee}
          placeholder="Assign to someone"
        />

        <Button title="Attach Image" onPress={pickImage} />

        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: tokens.radii.lg,
              marginTop: tokens.spacing.md,
            }}
            resizeMode="cover"
          />
        ) : null}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: tokens.spacing.md,
          backgroundColor: palette.background,
          borderTopWidth: 1,
          borderTopColor: palette.border,
        }}
      >
        <Button
          title={isEdit ? "Update Issue" : "Create Issue"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default CreateIssueScreen;
