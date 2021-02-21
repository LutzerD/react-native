import React, { useEffect, useState } from "react";
import { TextInput, Text, View } from "react-native";

export const ExpandingTextInput = (props) => {
  const [value, onChangeText] = useState(props.text || "");
  const [numLines, setNumLines] = useState({ current: 1 });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (shrunk && !resized) {
      setNumLines({ current: numLines.previous });
    }

    resized = false;
    shrunk = false;
  });

  useEffect(() => {
    if (submit) {
      props.onSubmitEditing(value);
      setSubmit(false);
    }
  }, [submit]);

  var resized, shrunk;

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
            shrunk = true;
          }
          if (props.item && props.item.text) props.item.text = text;
          onChangeText(text);
          if (props.onChangeText) props.onChangeText(text);
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
            console.log(
              `Updating ${props.text} from ${expectedLines} to ${numLines.current}`
            );
            //Todo: removing this breaks it? need a delay to avoid the maximum renders thing... that'll happen again when I have a full page or more... yeesh.
            //so refactor the noteview to render,load,render,load,etc.
            const numLinesCopy = { current: expectedLines };
            setNumLines({ current: expectedLines });
          }
          resized = true;
        }}
      />
    </View>
  );
};
