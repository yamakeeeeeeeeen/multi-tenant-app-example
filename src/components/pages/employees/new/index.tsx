import { Button, FormControl, FormLabel, HStack, Heading, Input, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { path } from '@/constants/path'
import { EmployeeForm } from '@/schema/zod/modelSchema/EmployeeSchema'

type Props = {
  subdomain: string
}

export const Page: FC<Props> = ({ subdomain }) => {
  const { register, handleSubmit } = useForm<EmployeeForm>({
    defaultValues: {
      name: '',
      kana: '',
      gender: 'male',
      color: '',
      hireDate: '',
      contractEndDate: '',
      jobType: 'manager_and_service_manager',
      division1: 'full_time',
      division2: 'full_time_hourly_employee',
      qualification: 'certified_care_worker',
      carDriving: true,
      payment: 0,
      move1hour: true,
      multipleAssignments: false,
      postalCode: '',
      address: '',
      addressDetail: '',
      email: '',
      phone: '',
      comment: '',
    },
  })

  const onValid = useCallback(
    async (data: EmployeeForm) => {
      const formattedData: EmployeeForm = {
        ...data,
        contractEndDate: data.contractEndDate ? data.contractEndDate : undefined,
        carDriving: true,
        payment: 0,
        move1hour: true,
      }

      try {
        const response = await fetch(path.api.employees.new(subdomain), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })

        const employees = await response.json()
        console.log(employees)
      } catch (error) {
        console.error(error)
      }
    },
    [subdomain],
  )

  return (
    <>
      <Heading as="h1" size="md" pb={4}>
        従業員新規登録
      </Heading>

      <VStack as="form" pb={4} onSubmit={handleSubmit(onValid)}>
        <FormControl id="name" width={200}>
          <FormLabel fontSize="xs">名前</FormLabel>
          <Input {...register('name')} type="text" size="xs" />
        </FormControl>
        <FormControl id="kana" width={200}>
          <FormLabel fontSize="xs">ふりがな</FormLabel>
          <Input {...register('kana')} type="text" size="xs" />
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">性別</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('gender')} value="male" size="sm">
                男性
              </Radio>
              <Radio {...register('gender')} value="female" size="sm">
                女性
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id="color" width={200}>
          <FormLabel fontSize="xs">Color</FormLabel>
          <Input {...register('color')} type="text" size="xs" />
        </FormControl>
        <FormControl id="hireDate" width={200}>
          <FormLabel fontSize="xs">入職日</FormLabel>
          <Input {...register('hireDate')} type="date" size="xs" />
        </FormControl>
        <FormControl id="contractEndDate" width={200}>
          <FormLabel fontSize="xs">契約満了日</FormLabel>
          <Input {...register('contractEndDate')} type="date" size="xs" />
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">職種</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('jobType')} value="manager_and_service_manager" size="sm">
                管理者兼サビ管
              </Radio>
              <Radio {...register('jobType')} value="service_supervisor" size="sm">
                サービス責任者
              </Radio>
              <Radio {...register('jobType')} value="care_staff" size="sm">
                介護スタッフ
              </Radio>
              <Radio {...register('jobType')} value="nurse" size="sm">
                看護師
              </Radio>
              <Radio {...register('jobType')} value="clerk" size="sm">
                事務員
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">区分1</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('division1')} value="full_time" size="sm">
                常勤
              </Radio>
              <Radio {...register('division1')} value="part_time" size="sm">
                非常勤
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">区分2</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('division2')} value="permanent_employee" size="sm">
                正社員
              </Radio>
              <Radio {...register('division2')} value="full_time_hourly_employee" size="sm">
                時間給常勤
              </Radio>
              <Radio {...register('division2')} value="part_time_employee" size="sm">
                パート
              </Radio>
              <Radio {...register('division2')} value="night_shift_part_time_employee" size="sm">
                夜勤パート
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">資格</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('qualification')} value="certified_care_worker" size="sm">
                介護福祉士
              </Radio>
              <Radio {...register('qualification')} value="practical_training_course_graduate" size="sm">
                実務者研修
              </Radio>
              <Radio {...register('qualification')} value="beginner_training_course_graduate" size="sm">
                初任者研修
              </Radio>
              <Radio {...register('qualification')} value="severe_in_home_care_level_5" size="sm">
                重度訪問介護5
              </Radio>
              <Radio {...register('qualification')} value="caregiver" size="sm">
                介護士
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id="carDriving" width={200}>
          <FormLabel fontSize="xs">対応可否（車の運転等）</FormLabel>
          {/*TODO: チェックボックス形式にする*/}
          <Input {...register('carDriving')} type="text" size="xs" />
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">1時間移動する[通常]</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('move1hour')} value="true" size="sm">
                1時間移動する[通常]
              </Radio>
              <Radio {...register('move1hour')} value="false" size="sm">
                1時間移動しない
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">複数担当設定</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register('move1hour')} value="false" size="sm">
                なし
              </Radio>
              <Radio {...register('move1hour')} value="true" size="sm">
                副業名
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id="postalCode" width={200}>
          <FormLabel fontSize="xs">郵便番号</FormLabel>
          <Input {...register('postalCode')} type="text" size="xs" />
        </FormControl>
        <FormControl id="address" width={200}>
          <FormLabel fontSize="xs">住所</FormLabel>
          <Input {...register('address')} type="text" size="xs" />
        </FormControl>
        <FormControl id="addressDetail" width={200}>
          <FormLabel fontSize="xs">丁目番地他</FormLabel>
          <Input {...register('addressDetail')} type="text" size="xs" />
        </FormControl>
        <FormControl id="email" width={200}>
          <FormLabel fontSize="xs">メールアドレス</FormLabel>
          <Input {...register('email')} type="text" size="xs" />
        </FormControl>
        <FormControl id="phone" width={200}>
          <FormLabel fontSize="xs">電話番号</FormLabel>
          <Input {...register('phone')} type="text" size="xs" />
        </FormControl>
        <FormControl id="comment" width={200}>
          <FormLabel fontSize="xs">コメント</FormLabel>
          <Input {...register('comment')} type="text" size="xs" />
        </FormControl>

        <HStack>
          <Button size="xs" variant="outline">
            入力内容をクリア
          </Button>
          <Button type="submit" size="xs" variant="outline">
            登録
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
