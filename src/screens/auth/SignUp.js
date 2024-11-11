import { KeyboardAvoidingView, StatusBar, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ReportIcon from '../../components/ReportIcon';
import { theme } from '../../theme';
import { useAuth } from '../../utils/auth';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const SignUp = (props) => {

  const { index, setIndex } = useAuth();

  const [isStudent, setIsStudent] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [rollNumber, setRollNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [department, setDepartment] = React.useState('');

  const handleTeacherSignUp = async () => {
    try {
      if(!email || !fullName || !department || !password) {
        ToastAndroid.show('Fields Should Not Be Empty',ToastAndroid.LONG);
        return;
      }
      if(password!==passwordConfirm){
        ToastAndroid.show('Password Does not Match',ToastAndroid.LONG);
        return;
      }
        const response = await axios.post('https://attendancetrackerbackend.onrender.com/api/teacher/register', {
            email: email,
            fullName: fullName,
            department: department,
            password: password,
        });
        console.log('Registration Successful:', response.data);
        ToastAndroid.show('Registration Successful !', ToastAndroid.LONG);
        props.setIsStudent(false);
        props.setIsSignUp(false);
    } catch (error) {
      if(typeof(error.response.data.error)=="string"){
        ToastAndroid.show(`Registration failed: ${error.response.data.error}`, ToastAndroid.LONG);
      }else{
        ToastAndroid.show(`Registration failed: ${error.response.data}`, ToastAndroid.LONG);
      }
    }
};

  const handleStudentSignUp = async () => {
    try {
      if(!email || !fullName || !rollNumber || !password) {
        ToastAndroid.show('Fields Should Not Be Empty',ToastAndroid.LONG);
        return;
      }
      if(password!==passwordConfirm){
        ToastAndroid.show('Password Does not Match',ToastAndroid.LONG);
        return;
      }
        const response = await axios.post('https://attendancetrackerbackend.onrender.com/api/student/register', {
            email: email,
            fullName: fullName,
            rollNumber: rollNumber,
            password: password,
        });
        console.log('Registration successful:', response.data);
        ToastAndroid.show('Registration Successful !', ToastAndroid.LONG);
        props.setIsStudent(true);
        props.setIsSignUp(false);
    } catch (error) {
      ToastAndroid.show(`Registration failed: ${error.response.data}`, ToastAndroid.LONG);

    }
};

  return (
    <>
      <KeyboardAvoidingView>
        <StatusBar
          backgroundColor={theme.maincolor}
          barStyle={"light-content"}
          hidden={false}
        />
        <View className="h-screen flex justify-center items-center gap-y-4 relative">
          <View className="h-28 w-28 bg-[#01818C] absolute top-0 left-0 rounded-br-full"></View>
          <View className="h-36 w-36 bg-[#01808c87] absolute top-0 left-0 rounded-br-full"></View>
          <View className="h-20 w-20 bg-[#01808c87] absolute bottom-0 right-0 rounded-tl-full"></View>
          <View><ReportIcon color={'#01818C'} size={30} /></View>
          <View><Text className="text-3xl font-bold text-[#2e2e2e]">{isStudent ? 'Student Sign Up' : 'Teacher Sign Up'}</Text></View>
          <View><Text className="text-sm text-gray-500">Already have an account? <Text className="text-[#01818C] underline" onPress={() => props.setIsSignUp(false)}>Log In!</Text></Text></View>
          <View className="flex flex-row justify-around w-[80%]">

            <TouchableOpacity onPress={() => setIsStudent(true)} className={`${isStudent ? 'bg-[#01818C]' : 'bg-white'} border-[#01818C] border-2 w-[50%] py-2 flex justify-center items-center rounded-l-lg`}><Text className={`${isStudent ? 'text-white' : 'text-[#01818C]'} text-[13px] font-medium`}>Student</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => setIsStudent(false)} className={`${isStudent ? 'bg-[#ffffff]' : 'bg-[#01818C]'} border-[#01818C] border-2 w-[50%] py-2 flex justify-center items-center rounded-r-lg`}><Text className={`${isStudent ? 'text-[#01818C]' : 'text-white'} text-[13px] font-medium`}>Teacher</Text></TouchableOpacity>

          </View>
          <View className="border-2 border-gray-300 flex justify-center items-center gap-y-4 w-[80%] pb-4 rounded-2xl">
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setEmail}
                value={email}
                placeholder="Enter Email ID..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setFullName}
                value={fullName}
                placeholder="Enter Full Name..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
              />
            </View>
            {isStudent && <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setRollNumber}
                value={rollNumber}
                placeholder="Enter Roll Number..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
              />
            </View>}
            {!isStudent && <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setDepartment}
                value={department}
                placeholder="Enter Department..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
              />
            </View>}
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setPassword}
                value={password}
                placeholder="Enter Password..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
                secureTextEntry={true}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, width: '90%' }}>
              <TextInput
                placeholderTextColor='#909090'
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                placeholder="Enter Password Again..."
                style={{ flex: 1, paddingLeft: 10, height: 40, color: 'gray' }}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity 
          onPress={ () => {
            isStudent?handleStudentSignUp():handleTeacherSignUp();
          }}
          // onPress={() => navigation.navigate('LogIn')} 
          className="bg-[#01818C] w-[70%] py-3 flex justify-center items-center rounded-lg"><Text className="text-white text-[16px] font-bold">Sign Up</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;