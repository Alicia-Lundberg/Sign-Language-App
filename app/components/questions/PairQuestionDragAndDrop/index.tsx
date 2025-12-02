import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Box, DropZone } from './types';

const { width } = Dimensions.get('window');

const DROP_ZONE_COUNT = 2;
const BOX_SIZE = 80;
const DROP_ZONE_SPACING = 6;
const DROP_ZONE_WIDTH =
  (width - DROP_ZONE_COUNT * BOX_SIZE) / (DROP_ZONE_COUNT + 1);

const index = () => {
  const initialDropZones: DropZone[] = Array.from(
    { length: DROP_ZONE_COUNT },
    (_, index) => ({
      id: `dropzone-${index}`,
      x: DROP_ZONE_SPACING * (index + 1) + BOX_SIZE * index,
      y: 1,
      occupiedBy: null,
    }),
  );

  const initialDraggableBoxes: Box[] = [
    { id: 'box-1', image: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png', title: 'God Morgon', x: DROP_ZONE_SPACING, y: 100 },
    { id: 'box-2', image: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png', title: 'God Natt', x: DROP_ZONE_SPACING, y: 100 },
  ];

  const [dropZones, setDropZones] = useState<DropZone[]>(initialDropZones);
  const [draggableBoxes, setDraggableBoxes] = useState<Box[]>(initialDraggableBoxes);
  const [boxArrangement, setBoxArrangement] = useState<Box[]>([]);

  const translateValues = draggableBoxes.map(() => ({
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
  }))

  const onGestureEvent = (boxIndex: number) => useAnimatedGetstureHandler({
    onStart: (_, ctx: { startX: number, startY: number }) => {
      const box = draggableBoxes[boxIndex];
      ctx.startX = box.x + translateValues[boxIndex].translateX.value;
      ctx.startY = box.y + translateValues[boxIndex].translateY.value;
    },
    onActive: (event, ctx: { startX: number, startY: number }) => {
      translateValues[boxIndex].translateX.value = ctx.startX + event.translationX - draggableBoxes[boxIndex].x;
      translateValues[boxIndex].translateY.value = ctx.startY + event.translationY - draggableBoxes[boxIndex].y;
    },
    onEnd: () => {
      let closestZone: any | DropZone | null = null;
      let minDistance = Infinity;

      dropZones.forEach(zone => {
        if (!zone.occupiedBy || zone.occupiedBy === draggableBoxes[boxIndex].id) {
          const distance = Math.sqrt(
            Math.pow(
              zone.x - draggableBoxes[boxIndex].x - translateValues[boxIndex].translateX.value, 2) +
            Math.pow(
              zone.y - draggableBoxes[boxIndex].y - translateValues[boxIndex].translateY.value, 2
            )
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestZone = zone;
          }
        }
      });
      if (closestZone) {
        const updatedDropZones = dropZones.map(zone =>
          zone.id === closestZone!.id ? { ...zone, occupiedBy: draggableBoxes[boxIndex].id }
            : zone.occupiedBy === draggableBoxes[boxIndex].id ? { ...zone, occupiedBy: null } : zone
        )
        runOnJS(setDropZones)(updatedDropZones);

        const updatedArrangement = updatedDropZones.filter(zone => zone.occupiedBy).map(zone => {
          const box = draggableBoxes.find(b => b.id === zone.occupiedBy);

          if (box) {
            return {
              id: box.id,
              image: box.image,
              title: box.title,
              x: box.x,
              y: box.y
            };
          }

          return null;

        }).filter((item,): item is {
          id: string;
          image: string;
          title: string;
          x: number;
          y: number
        } => item !== null
        );

        runOnJS(setBoxArrangement)(updatedArrangement);

        translateValues[boxIndex].translateX.value = withSpring(closestZone.x - draggableBoxes[boxIndex].x)
        translateValues[boxIndex].translateY.value = withSpring(closestZone.y - draggableBoxes[boxIndex].y)
      } else {
        translateValues[boxIndex].translateX.value = withSpring(0)
        translateValues[boxIndex].translateY.value = withSpring(0)
      }
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {draggableBoxes.map((box, index) => {

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: translateValues[index].translateX.value },
            { translateY: translateValues[index].translateY.value }
          ]

        }))

        return (
          <PanGestureHandler key={box.id}>
            onGestureEvent={onGestureEvent(index)}
            <Animated.View style={[styles.box, { left: box.x, top: box.y }, animatedStyle]}>
              <Image source={{ uri: box.image }} style={styles.image} />
            </Animated.View>
          </PanGestureHandler>
        )
      })}
      {dropZones.map(zone => (
        <View
          key={zone.id}
          style={[styles.dropZone, {
            left: zone.x, top: zone.y
          },
          zone.occupiedBy && styles.hidden
          ]}></View>
      ))}
    </GestureHandlerRootView>
  )
}

export default index;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  leftColumn: { width: '45%', justifyContent: 'space-around' },
  rightColumn: { width: '45%', justifyContent: 'space-around' },
  target: {
    width: '100%',
    height: width * 0.4,
    borderWidth: 3,
    borderRadius: 12,
    marginBottom: 20,
  },
  gif: { width: '100%', height: '100%', borderRadius: 12 },
  word: {
    padding: 15,
    backgroundColor: '#4A90E2',
    marginBottom: 20,
    borderWidth: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  wordText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  box: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: '#353232ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
  hidden: {
    opacity: 0,
    backgroundColor: '#95a5a6'
  },
  dropZone: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 2,
    borderColor: '#29312cff',
    borderRadius: 8,
    backgroundColor: 'red'
  }
});

