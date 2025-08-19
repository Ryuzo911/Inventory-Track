import { FC, PropsWithChildren } from "react";
import Wrapper from "./Wrapper";

type FormGroupProps = PropsWithChildren;

const FormGroup: FC<FormGroupProps> = ({children}) => {
    return <Wrapper gap={10}>{children}</Wrapper>
};

export default FormGroup;