import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const ClassroomListsPage = () => {
  const router = useRouter()
  return (
    <View>
      <Text className='text-5xl font-bold text-blue-600'>ClassRoom List</Text>
      <Button title='Go to Login Page' onPress={()=>router.push('/login')} />
    </View>
  )
}

export default ClassroomListsPage