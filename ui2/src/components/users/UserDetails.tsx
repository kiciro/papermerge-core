import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Breadcrumbs, Box, LoadingOverlay, Group, Button} from "@mantine/core"

import {selectUserDetails} from "@/slices/userDetails"

import type {UserDetails, SliceState} from "@/types"
import type {RootState} from "@/app/types"
import UserForm from "./UserForm"
import EditButton from "./EditButton"
import DeleteButton from "./DeleteButton"
import ChangePasswordButton from "./ChangePasswordButton"

export default function UserDetailsComponent() {
  const {status, data} = useSelector<RootState>(
    selectUserDetails
  ) as SliceState<UserDetails>

  if (data == null) {
    return (
      <Box pos="relative">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{radius: "sm", blur: 2}}
        />
        <Path user={null} />
        <UserForm user={null} />
      </Box>
    )
  }

  return (
    <>
      <Group justify="space-between">
        <Path user={data} />
        <ActionButtons modelId={data?.id} />
      </Group>
      <UserForm user={data} />
    </>
  )
}

function Path({user}: {user: UserDetails | null}) {
  return (
    <Breadcrumbs>
      <Link to="/users/">Users</Link>
      <Link to={`/users/${user?.id}`}>{user?.username}</Link>
    </Breadcrumbs>
  )
}

function ActionButtons({modelId}: {modelId?: string}) {
  return (
    <Group>
      <ChangePasswordButton userId={modelId} />
      <EditButton userId={modelId} />
      <DeleteButton />
    </Group>
  )
}
