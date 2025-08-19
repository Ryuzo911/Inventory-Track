import { useState } from "react"
import Wrapper from "./Wrapper";
import FormGroup from "./FormGroup";
import ImageSelector from "./ImageSelector";
import Button from "./Button";

const ChangeAvatar = () => {
    const [image, setImage] = useState<string>("");
    return(
        <Wrapper gap={30}>
            <FormGroup>
                <ImageSelector label="Pilih Avatar" value={image} onChange={setImage}/>
            </FormGroup>
            <Button label="Ganti Profile" icon="check" onPress={() => console.log("Ganti Avatar")}/>
        </Wrapper>
    )
};

export default ChangeAvatar;