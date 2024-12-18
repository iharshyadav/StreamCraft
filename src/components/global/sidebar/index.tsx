'use client'
import { getWorkSpaces } from '@/actions/workspace'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getNotifications } from '@/actions/user'
import { useQueryComponennt } from '@/hooks/useQuery'
import { WorkSpaceProps } from '@/types/index.types'
import Model from '../model/model'
import { PlusCircle } from 'lucide-react'
type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {

  const router = useRouter()
  const pathName = usePathname()


  const {data , isFetched} = useQueryComponennt(['user-workspaces'] , getWorkSpaces)

  const {data : workSpace} = data as WorkSpaceProps

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`)
  }

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image
          src="/opal-logo.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <p className="text-2xl">StreamCraft</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-20 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
           {
            workSpace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}> 
                {workspace.name}
              </SelectItem>
            ))
           }
            {workSpace.members.length > 0 &&
              workSpace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Model
      trigger={
        <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
          <PlusCircle
            size={15}
            className="text-neutral-800/90 fill-neutral-500"
          />
          <span className="text-neutral-400 font-semibold text-xs">
            Invite To Workspace
          </span>
        </span>
      }
      title="Invite To Workspace"
      description="Invite other users to your workspace"
    >
      search
      {/* <Search workspaceId={activeWorkspaceId} /> */}
      </Model>
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ">Workspaces</p>
   
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
        </ul>
      </nav>
      <Separator className="w-4/5" />
      
    </div>
  )
  return (
    <div className="full">
      {/* <InfoBar /> */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger
            asChild
            className="ml-2"
          >
            <Button
              variant={'ghost'}
              className="mt-[2px]"
            >
              {/* <Menu /> */}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className="p-0 w-fit h-full"
          >
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  )
}

export default Sidebar