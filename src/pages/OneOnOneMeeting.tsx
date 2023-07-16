import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiSpacer, EuiForm } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUserField from '../components/FormComponents/MeetingUserField'
import MeetingDateField from '../components/FormComponents/MeetingDateField'
import useAuth from '../hooks/useAuth';
import useFetchUsers from "../hooks/useFetchUser";
import moment from "moment";
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import { FieldErrorType, UserType } from '../utils/Types';
import { addDoc } from 'firebase/firestore';
import { meetingsRef } from '../utils/FirebaseConfig';
import { generateMeetingID } from '../utils/generateMeetingId';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';


function OneOnOneMeeting() {
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const navigate = useNavigate();
    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [showErrors, setShowErrors] = useState<{
        meetingName: FieldErrorType;
        meetingUser: FieldErrorType;
    }>({
        meetingName: {
            show: false,
            message: [],
        },
        meetingUser: {
            show: false,
            message: [],
        },
    });
    const onUserChange = (selectedOptions:any) => {
        setSelectedUsers(selectedOptions);
    };

    const validateForm = () => {
        let errors = false;
        const clonedShowErrors = {...showErrors}
        if (!meetingName.length) {
            clonedShowErrors.meetingName.show = true;
            clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
            errors = true;
        } else {
            clonedShowErrors.meetingName.show = false;
            clonedShowErrors.meetingName.message =[];
        }
        if(!selectedUsers.length) {
            clonedShowErrors.meetingUser.show = true;
            clonedShowErrors.meetingUser.message = ["Please select a user"];
        } else {
            clonedShowErrors.meetingUser.show = false;
            clonedShowErrors.meetingUser.message =[];
        }
        setShowErrors(clonedShowErrors);
        return errors;
    };

    const createMeeting = async() => {
        if (!validateForm()) {
            const meetingId = generateMeetingID();
            await addDoc(meetingsRef, {
                createBy: uid,
                meetingId,
                meetingName,
                meetingType: "1-on-1",
                invitedUsers: [selectedUsers[0].uid],
                meetingDate: startDate.format("L"),
                maxUsers: 1,
                status: true,
            });
            createToast({
                title: "One on One Meeting Created Successfully.",
                type: "success",
            });
            navigate("/");

        }
    };
  return (
    <div
        style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
        }}>
        <Header/>
            <EuiFlexGroup justifyContent='center' alignItems= 'center'>
                <EuiForm>
                    <MeetingNameField 
                    label="Meeting Name"
                    placeholder="Meeting Name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                    />
                    <MeetingUserField
                        label="Invite User"
                        options={users}
                        onChange={onUserChange}
                        selectedOptions={selectedUsers}
                        singleSelection={{ asPlainText: true }}
                        isClearable={false}
                        placeholder='select a user'
                        isInvalid={showErrors.meetingUser.show}
                        error={showErrors.meetingUser.message}
                        />
                        <MeetingDateField selected={startDate} setStartDate={setStartDate} />
                        <EuiSpacer/>
                        <CreateMeetingButtons createMeeting={createMeeting}/>
                </EuiForm>
            </EuiFlexGroup>
        
    </div>
  )
}

export default OneOnOneMeeting