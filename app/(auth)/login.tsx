import Wrapper from "@/components/Wrapper";
import useLogin from "@/hooks/authentication/useLogin";
import { useColor } from "@/hooks/useColor";
import { useSession } from "@/hooks/useSession";
import { router } from "expo-router";
import {  useState } from "react"
import {Octicons} from "@expo/vector-icons"
import Text from "@/components/Text";
import Input from '@/components/Input'
import Button from "@/components/Button";
import PasswordToggler from "@/components/PasswordToggler";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password");
  const [show, setShow] = useState<boolean>(false);
  const {signIn} = useSession();
  const {color} = useColor();

  const  {mutateAsync, isPending, error} = useLogin();

  const handleLogin = async () => {
    mutateAsync({email, password})
    .then((token) => {
      signIn(token);
      router.replace("/")
    })
    .catch((error) => {
      console.log("gagal login", error)
    })
  }

  return (

    <Wrapper 
    padding={40}
    alignItems="center"
    justifyContent="center"
    flex={1}
    gap={30}
>
    <Octicons name="code" color={color.primary.bg} size={82}/>
    <Text>Selamat datang di halaman login</Text>
    {error && <Text color={color.error.bg} >{error.message}</Text>}
    <Wrapper width={"100%"} gap={10}>
      <Input placeholder="Email address" value={email} onChangeText={setEmail}/>
      <Input secureTextEntry={!show} placeholder="Password" value={password} onChangeText={setPassword}/>
      <Wrapper>
        <Text>Lupa password?</Text>
        <PasswordToggler show={show} setShow={setShow}/>
      </Wrapper>
    <Wrapper>
      <Button label="Login " icon="sign-in" onPress={handleLogin} loading={isPending}/>
    </Wrapper>
    </Wrapper>
    <Text>Belum punya akun? <Text style={{textDecorationLine: "underline"}} onPress={() => router.push("/register")}>Buat di sini!</Text></Text>
    </Wrapper>
  )
};

export default LoginScreen;