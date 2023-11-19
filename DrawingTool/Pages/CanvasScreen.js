import React, { useEffect, useCallback, useState, useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import io from 'socket.io-client';

const CanvasScreen = ({ route }) => {
  const { username, sessionId } = route.params;
  const [paths, setPaths] = useState([]);
  const socketRef = useRef(null);


  useEffect(() => {
    // Création de la connexion Socket.IO lors du montage du composant
    socketRef.current = io("http://192.168.0.90:3000");

    // Événement de joindre la session
    socketRef.current.emit("joinSession", { sessionId, username });

    socketRef.current.on("updateDrawing", (data) => {
      const { username, data: drawingData } = data;
      setPaths((currentPaths) => [...currentPaths, drawingData]);
    });  
    
    // Gestionnaire de déconnexion lors du démontage du composant
    return () => {
      socketRef.current.disconnect();
    };
  }, [sessionId, username]);

  const onDrawingStart = useCallback((touchInfo: TouchInfo) => {
    setPaths((old) => {
      const { x, y } = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [...old, newPath];
    });
  }, []);

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const currentPath = Skia.Path.Make();
      currentPath.addPath(currentPaths[currentPaths.length - 1]);
      const lastPoint = currentPath.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      
      socketRef.current.emit("updateDrawing", { sessionId, username, data: currentPath });

      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, [socketRef]);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart]
  );

  const clearCanvas = () => {
    setPaths([]);
    console.log("clear");
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canva} onTouch={touchHandler}>
          {paths.map((path, index) => (
            <Path
              key={index}
              path={path}
              color={"black"}
              style={"stroke"}
              strokeWidth={2}
            />
          ))}
        </Canvas>
        <Text style={styles.sessionCode}>{route.params.sessionId}</Text>
      </View>
      <Button title="Clear" onPress={clearCanvas} />
    </View>
  );
};

const styles = StyleSheet.create({
  canva: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  canvasContainer: {
    flex: 1,
    position: "relative",
  },
  sessionCode: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default CanvasScreen;
