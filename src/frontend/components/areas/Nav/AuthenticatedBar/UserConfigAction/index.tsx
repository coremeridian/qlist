import React from "react";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { selectUsername } from "@features/users/userSlice";
import { useAppSelector, type RootState } from "@App/store";
import { PopoverFrame } from "@features/uistate/ActionFrame";

const UserConfigAction = () => {
    const username = useAppSelector((state: RootState) =>
        selectUsername(state)
    );

    return (
        <PopoverFrame buttonIcon={<AiOutlineUser />}>
            <div className="grid grid-cols-2 bg-white">
                <span>{username}</span>
                <span>Testing</span>
            </div>
        </PopoverFrame>
    );
};

export default UserConfigAction;
