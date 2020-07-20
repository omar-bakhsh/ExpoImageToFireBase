Eimport * as React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Button, ThemeProvider, Image, Divider, Tooltip, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase";





// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "8"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



export default class omarApp extends React.Component {

  //FileSystem.documentDirectory + 'SQLite/My.db'






  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <ThemeProvider>
          <Tooltip style={styles.continer_txt} popover={<Text>!اظغط على زر رفع الصورة  </Text>}><Icon
            name='lock'
            color='#880022' />
            <Text style={styles.txt} rightComponent={{ icon: 'home', color: '#550000' }}>ارفع الصور للاخفاء</Text>
          </Tooltip>
          {image && <Image source={{ uri: image }} style={{ width: 480, height: 480 }} PlaceholderContent={<ActivityIndicator />} />}
          <Divider style={{ backgroundColor: 'black' }} />
          <TouchableOpacity onPress={this._pickImage} style={{ margin: 15, paddingVertical: 5, backgroundColor: "#005500", width: 130, height: 40, borderRadius: 25 }} ><Text style={{ color: "#fff", paddingHorizontal: 25, fontWeight: "bold", fontSize: 20 }} >رفع صورة</Text></TouchableOpacity>
          <TouchableOpacity onPress={this._pickImage} style={{ margin: 15, paddingVertical: 5, backgroundColor: "#772010", width: 130, height: 40, borderRadius: 25 }} ><Text style={{ color: "#fff", paddingHorizontal: 15, fontWeight: "bold", fontSize: 18 }} >اخفاء الصورة</Text></TouchableOpacity>
        </ThemeProvider>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  // get permission from user
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  // img pick fun
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [10, 10],
        quality: 1,

      });
      // if user pick img update url to state
      if (!result.cancelled) {
        this.setState({ image: result.uri });

        console.log("3 xxxxxxxxxxfailed result.uri xxxxxxxxxxxx", result);
        // pass argement to uploadImage fun uri + name 
        this.uploadImage(result.uri, "test-image").then(() => {

          console.log("--------------secsess-------------");

        }).catch((error) => {

          console.log("1 xxxxxxxxxxfailed uploadImage xxxxxxxxxxxx", error);

        })
      }

      console.log(result);
    } catch (E) {
      console.log("2 xxxxxxxxxxx img not picked BCZ xxxxxxxxxxxxxxx", E);
    }
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("4 xxxxxxxxxxx bloob xxxxxxxxxxxxxxx", JSON.stringify(blob));
    var ref = firebase.storage().ref().child("myimage/" + imageName);
    return ref.put(blob);


  }
}




// style 
const styles = StyleSheet.create({
  continer_txt: {
    width: '100%',
    height: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  txt: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    justifyContent: 'center',
    color: "#95f895"
  }
});xpoImageToFireBase
