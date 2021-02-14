import React, { useEffect, useState } from "react";
import { TextInput, Text, View } from "react-native";

export const ExpandingTextInput = (props) => {
  const [value, onChangeText] = useState(props.text || "");
  const [numLines, setNumLines] = useState({ current: 1 });
  const [shrunk, setShrunk] = useState(false);
  const [submit, setSubmit] = useState(false);

  const resetFlags = () => {
    setShrunk(false);
    resized ? (resized = false) : null;
  };

  useEffect(() => {
    if (shrunk && !resized) {
      setNumLines({ current: numLines.previous });
    }
    resetFlags();
  });

  useEffect(() => {
    if (submit) {
      props.onSubmitEditing(value);
      setSubmit(false);
    }
  }, [submit]);

  var resized;

  return (
    <View>
      <TextInput
        {...props}
        onKeyPress={(event) => {
          if (
            event.nativeEvent.key === "Enter" &&
            !event.repeat &&
            props.onSubmitEditing
          ) {
            setSubmit(true);
          }
        }}
        onChangeText={(text) => {
          if (text.length < value.length) {
            const numLinesCopy = { current: 1, previous: numLines.current };
            setNumLines(numLinesCopy); //Necessary.. dumb but yeah, otherwise oncontentchange doesn't catch size reductions if numberOfLInes is attached to a non-const... weird...
            setShrunk(true);
          }
          if (props.item && props.item.text) props.item.text = text;
          onChangeText(text);
        }}
        value={value}
        autoFocus
        multiline={true}
        numberOfLines={numLines.current}
        onContentSizeChange={(event) => {
          const expectedLines = Math.floor(
            event.nativeEvent.contentSize.height / 19
          );
          if (expectedLines != numLines.current) {
            const numLinesCopy = { current: expectedLines };
            setNumLines({ current: expectedLines });
          }
          resized = true;
        }}
      />
    </View>
  );
};
