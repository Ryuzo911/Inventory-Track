import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import PasswordToggler from "@/components/PasswordToggler";
import  Text  from "@/components/Text";
import Wrapper from "@/components/Wrapper";
import useRegister from "@/hooks/authentication/useRegister";
import { useColor } from "@/hooks/useColor";
import { useSession } from "@/hooks/useSession";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react"

const RegisterScreen = () => {
  const {signIn} = useSession();
  const {color} = useColor();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [password_confirmation, setConfirm] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const {mutateAsync, isPending, error} = useRegister();

  const handleRegister = async () => {
    const payload = {
      name: name.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const token = await mutateAsync(payload);

      signIn(token);
      console.log("Berhasil register", token);
      router.push("/");
    } catch (err: any) {
      if (err?.response?.data) {
        console.log("Error register",err?.response?.data);
        
        const data = err.response.data;
        if (data.errors) {
          const all = Object.values(data.errors)
          .flat()
          .join("\n")

          console.warn("Validation register", all);
        } else if (data.message) {
          console.warn("Message:", data.message);
        } else {
          console.warn("Unknown error:", data);
        }
      } else {
        console.warn("Register error:", err);
      }
    }

  }
  
  return (
    <Wrapper padding={40} alignItems="center" justifyContent="center" flex={1} gap={30}>
      <Octicons name="code" color={color.primary.bg} size={82}/>
      <Wrapper width={"100%"} gap={10}>
        <Text>
          Selamat datang di halaman register, silahkan masukkan nama, email, dan password anda.
        </Text>
      </Wrapper>
      <Wrapper width={"100%"} gap={10}>
        <Input placeholder="Nama" value={name} onChangeText={setName}/>
        <Input placeholder="Email" value={email} onChangeText={setEmail}/>
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!show}/>
        {/* <Input placeholder="Password Confirmation" value={password_confirmation} onChangeText={setConfirm} secureTextEntry={!show}/> */}
        <PasswordToggler show={show} setShow={setShow} />
      </Wrapper>
      {error && <ErrorMessage message={error.message}/>}
      <Button loading={isPending} label="Register " icon="person-add" onPress={handleRegister}
    />

      <Text> Sudah punya akun? <Text style={{textDecorationLine: "underline"}} onPress={() => router.push("/login")}>Press here</Text></Text>
    </Wrapper>
  )
};

export default RegisterScreen;