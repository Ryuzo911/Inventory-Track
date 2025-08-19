import { useState } from "react"
import Wrapper from "./Wrapper";
import FormGroup from "./FormGroup";
import Input from "./Input";
import PasswordToggler from "./PasswordToggler";
import Button from "./Button";

const ChangePassword = () => {
    const [show, setShow] = useState(false);
    return (
        <Wrapper gap={30}>
            <FormGroup>
                <Input label="Password Lama" placeholder="Current Password" secureTextEntry={!show}/>
                <Input label="Password Baru" placeholder="New Password" secureTextEntry={!show}/>
                <PasswordToggler show={show} setShow={setShow} />
            </FormGroup>
            <Button label="Ganti Password" icon="check" onPress={() => console.log("Ganti Password")}/>
        </Wrapper>
    );
};

export default ChangePassword;