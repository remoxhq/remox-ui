import { Button } from "@components/shadcn/button";
import { DialogClose } from "@components/shadcn/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus, Trash } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/shadcn/form";
import { Input } from "@components/shadcn/input";

import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import Web from "@assets/icons/web";
import Github from "@assets/icons/github";
import Twitter from "@assets/icons/twitter";
import Discord from "@assets/icons/discord";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadcn/select";
import { chains } from "@/constants";
import { Checkbox } from "@components/shadcn/checkbox";
import { useToast } from "@components/shadcn/use-toast";
import { useNavigate } from "react-router-dom";
import SelectWithSearch from "./selectWithSearch";
import useAccessControl from "@/hooks/useAccessControl";
import { useUserInfo } from "@/zustand/userInfo";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const formSchema = z.object({
  image: z
    .instanceof(File, { message: "Upload Img" })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), { message: "Only png, jpg, jpeg and webp supported" })
    .refine((file) => file.size < MAX_UPLOAD_SIZE, { message: "Image must be less than 3MB" })
    .optional(),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .regex(/^(?:[a-zA-Z0-9-_.]|['"](?=[a-zA-Z0-9-_.]+['"]))+$/, {
      message: "Name must only contain letter,symbols and numbers",
    })
    .min(3, {
      message: "Name must be minimum 3 characters",
    })
    .max(40, {
      message: "Name must be maximum 40 characters",
    }),
  dashboardLink: z
    .string({
      required_error: "Link slug is required",
      invalid_type_error: "Link slug must be a string",
    })
    .regex(/^[a-z0-9]+$/, {
      message: "Link slug must only contain letter and numbers",
    })
    .min(3, {
      message: "Link slug must be minimum 3 characters",
    }),
  governanceSlug: z.string(),
  // nativeToken: z.string(),
  website: z.union([
    z.string().url({ message: "Invalid url type" }).startsWith("https://", { message: "Must provide secure URL (https://)" }).optional(),
    z.literal(""),
  ]),
  github: z.union([
    z.string().url({ message: "Invalid url type" }).startsWith("https://", { message: "Must provide secure URL (https://)" }).optional(),
    z.literal(""),
  ]),
  twitter: z.union([
    z.string().url({ message: "Invalid url type" }).startsWith("https://", { message: "Must provide secure URL (https://)" }).optional(),
    z.literal(""),
  ]),
  discord: z.union([
    z.string().url({ message: "Invalid url type" }).startsWith("https://", { message: "Must provide secure URL (https://)" }).optional(),
    z.literal(""),
  ]),
  accounts: z
    .array(
      z.object({
        address: z
          .string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
          })
          .length(42, { message: "Address is required" })
          .startsWith("0x", { message: "Address must starts with 0x" })
          .regex(/^[a-zA-Z0-9]+$/, { message: "Incorrect wallet address" }),
        name: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          })
          .min(3, { message: "Minimum 3 characters" })
          .max(10, { message: "Maximum 10 characters" }),
        chain: z.string().min(1, { message: "Choose Chain" }),
      })
    )
    .max(5),
  isPrivate: z.boolean().default(true).optional(),
  isVerified: z.boolean().default(false).optional(),
});

interface IProps {
  dialogOpener: React.Dispatch<React.SetStateAction<boolean>>;
  // orgname?:string
  // slug?:string
  // governanceSlug?:string
  // nativeToken?:string
  // image?:undefined | File
  // web?:string
  // github?:string
  // discord?:string
  // twitter?:string
  // isPrivate?:boolean
  // isVerify?:boolean
  // wallets?:{
  //   walletAddress:string
  //   walletChain:string
  //   walletName:string
  // }[]
}
function MainForm({ dialogOpener }: IProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUserInfo((state) => ({
    role: state.role,
    address: state.address,
  }));
  const { verifyAccess } = useAccessControl(user);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      dashboardLink: "",
      governanceSlug: "",
      // nativeToken: "",
      image: undefined,
      website: "",
      github: "",
      discord: "",
      twitter: "",
      accounts: [{ address: "", chain: "", name: "" }],
      isPrivate: true,
      isVerified: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "accounts",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value); // Dosyayı FormData'ya ekleyin
      } else if (key === "wallets" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value)); // JSON formatına dönüştürerek FormData'ya ekleyin
      } else if (typeof value === "string" || typeof value === "boolean") {
        formData.append(key, String(value)); // String veya boolean ise doğrudan FormData'ya ekleyin
      }
      // Diğer durumlar için istediğiniz eklemeyi yapabilirsiniz
    });

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  const resetOnClose = () => {
    form.reset(form.formState.defaultValues);
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      dialogOpener(false);
      form.reset(form.formState.defaultValues);
      navigate("/my-creations");

      toast({
        title: "Organization created",
        duration: 5000,
        variant: "createOrg",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 xs:space-y-4">
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <FormItem className="text-center relative">
                <Avatar className="mx-auto w-16 h-16 border-2 mb-3">
                  <AvatarImage className="object-cover" src={selectedImage ?? ""} alt="Organization Logo" />
                  <AvatarFallback className="bg-avatarbg"></AvatarFallback>
                </Avatar>
                <FormLabel htmlFor="uploadIMG" className="text-xs font-semibold text-brand cursor-pointer">
                  Upload Image
                </FormLabel>
                <FormControl>
                  <VisuallyHidden asChild>
                    <Input
                      id="uploadIMG"
                      className="pointer-events-none"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      disabled={form.formState.isSubmitting ? true : false}
                      type="file"
                      {...field}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          onChange(e.target.files[0]);
                          setSelectedImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  </VisuallyHidden>
                </FormControl>

                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>

                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            );
          }}
        />
        <div className="flex justify-between xs:items-center pt-2 flex-col xs:flex-row gap-3 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">Organization Name</FormLabel>
                <FormControl>
                  <Input
                    className={`rounded-[8px] font-medium ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                    placeholder="Organization Name"
                    disabled={form.formState.isSubmitting ? true : false}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dashboardLink"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">
                  Dashboard Slug
                  <span className="text-[10px] ml-2 text-foreground">remox.io/community/org-name</span>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    autoCapitalize="off"
                    className={`rounded-[8px] text-whitish font-medium ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                    placeholder="org-name"
                    disabled={form.formState.isSubmitting ? true : false}
                    {...field}
                  />
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription className="text-xs text-foreground">remox.io/community/org-name</FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between xs:items-center pt-2 flex-col xs:flex-row gap-3 w-full">
          <div className="basis-1/2 relative space-y-2">
            <span className="text-xs font-medium text-whitish">Native Token</span>
            <SelectWithSearch type="nativeToken" disabled value={""} setValue={form.setValue} />
          </div>
          <FormField
            control={form.control}
            name="governanceSlug"
            render={({ field: { value } }) => (
              <FormItem className="basis-1/2 relative">
                <FormLabel className="text-xs font-medium text-whitish">Governance</FormLabel>

                <SelectWithSearch type="governance" value={value} setValue={form.setValue} />

                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between xs:items-center gap-3  flex-col xs:flex-row w-full">
          <FormField
            control={form.control}
            name="website"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">Website</FormLabel>
                <FormControl className="relative">
                  <>
                    <Web className="absolute top-6 border-r w-7 h-10 object-cover pr-2 left-3 z-10" />
                    <Input
                      className={`rounded-[8px] pl-12 font-medium ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                      placeholder="Website link"
                      autoComplete="off"
                      disabled={form.formState.isSubmitting ? true : false}
                      {...field}
                    />
                  </>
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">Github</FormLabel>
                <FormControl className="relative">
                  <>
                    <Github className="absolute top-6 border-r w-7 h-10 overflow-hidden object-cover pr-2 left-3 z-10" />
                    <Input
                      className={`rounded-[8px] pl-12 font-medium  ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                      placeholder="Github Link"
                      disabled={form.formState.isSubmitting ? true : false}
                      autoComplete="off"
                      {...field}
                    />
                  </>
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between xs:items-center gap-3  flex-col xs:flex-row w-full">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">X/Twitter</FormLabel>
                <FormControl className="relative">
                  <>
                    <Twitter className="absolute top-6 border-r w-7 h-10 object-cover pr-2 left-3 z-10" />
                    <Input
                      className={`rounded-[8px] pl-12 font-medium ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                      placeholder="Twitter link"
                      disabled={form.formState.isSubmitting ? true : false}
                      autoComplete="off"
                      {...field}
                    />
                  </>
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discord"
            render={({ field, fieldState }) => (
              <FormItem className="basis-2/4 relative">
                <FormLabel className="text-xs font-medium text-whitish">Discord</FormLabel>
                <FormControl className="relative">
                  <>
                    <Discord className="absolute top-6 border-r w-7 h-10 object-cover pr-2 left-3 z-10" />
                    <Input
                      className={`rounded-[8px] pl-12 font-medium  ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                      placeholder="Discord Link"
                      disabled={form.formState.isSubmitting ? true : false}
                      autoComplete="off"
                      {...field}
                    />
                  </>
                </FormControl>
                <VisuallyHidden asChild>
                  <FormDescription></FormDescription>
                </VisuallyHidden>
                <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
              </FormItem>
            )}
          />
        </div>

        {fields.map((item, index) => {
          return (
            <div key={item.id} className={`flex justify-between items-center gap-4 xs:gap-2 flex-row w-full ${index !== 0 ? "my-3" : "pb-1"}`}>
              <div className="flex-grow flex gap-2 xs:gap-3 flex-col xs:flex-row xs:items-center">
                <FormField
                  control={form.control}
                  name={`accounts.${index}.chain`}
                  render={({ field }) => (
                    <FormItem className="basis-1/3 relative">
                      <FormLabel className="text-xs font-medium text-whitish">Choose Chain</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={form.formState.isSubmitting ? true : false}>
                        <FormControl>
                          <SelectTrigger className="text-whitish font-medium text-sm data-[placeholder]:text-muted-foreground cursor-pointer">
                            <SelectValue placeholder="Choose Chain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {chains.map((chain) => (
                            <SelectItem
                              key={chain.id}
                              value={chain.value}
                              className="cursor-pointer focus:bg-black/20 focus:text-whitish text-whitish font-medium text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <img src={chain.logo} alt={chain.name} className="w-5 h-5 object-cover overflow-hidden rounded-full" />
                                {chain.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <VisuallyHidden asChild>
                        <FormDescription></FormDescription>
                      </VisuallyHidden>
                      <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  // key={item.id}
                  name={`accounts.${index}.address`}
                  render={({ field, fieldState }) => (
                    <FormItem className="basis-1/3 relative">
                      <FormLabel className="text-xs font-medium text-whitish">Wallet Address</FormLabel>
                      <FormControl>
                        <Input
                          className={`rounded-[8px] font-medium ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                          placeholder="Wallet Address"
                          disabled={form.formState.isSubmitting ? true : false}
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <VisuallyHidden asChild>
                        <FormDescription></FormDescription>
                      </VisuallyHidden>
                      <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  // key={item.id}
                  name={`accounts.${index}.name`}
                  render={({ field, fieldState }) => (
                    <FormItem className="basis-1/3 relative">
                      <FormLabel className="text-xs font-medium text-whitish">Wallet Name</FormLabel>
                      <FormControl>
                        <Input
                          className={`rounded-[8px] font-medium  ${fieldState.invalid ? "text-destructive" : "text-whitish"}`}
                          placeholder="Wallet Name"
                          disabled={form.formState.isSubmitting ? true : false}
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <VisuallyHidden asChild>
                        <FormDescription></FormDescription>
                      </VisuallyHidden>
                      <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
                    </FormItem>
                  )}
                />
              </div>
              {index === 0 ? (
                <div className="overflow-hidden w-[32px] xs:w-[25px] mt-8 mr-2 xs:mr-0">
                  <Button
                    variant="add"
                    type="button"
                    disabled={fields.length <= 9 ? false : true}
                    className="w-8 h-8 xs:w-5 xs:h-5 p-0"
                    onClick={() => append({ address: "", chain: "", name: "" }, { shouldFocus: false })}
                  >
                    <Plus className="w-[20px] h-[20px] xs:w-[14px] xs:h-[14px]" />
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden w-[32px] xs:w-[25px] mt-8 mr-2 xs:mr-0">
                  <Button variant="remove" type="button" className="w-8 h-8 xs:w-5 xs:h-5 p-0" onClick={() => remove(index)}>
                    <Trash className="w-[18px] h-[18px] xs:w-[14px] xs:h-[14px]" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        <div className="flex items-center gap-8 flex-row w-full">
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="relative">
                <FormDescription className="text-[10px] font-medium text-whitish mb-1">Privacy</FormDescription>
                <div className="flex items-center gap-2">
                  <FormControl className="relative">
                    <Checkbox
                      id="isPrivate"
                      className="rounded-[4px] border-input data-[state=checked]:text-brand "
                      disabled={form.formState.isSubmitting ? true : false}
                      checked={field.value}
                      onCheckedChange={() => field.onChange(!field.value)}
                    />
                  </FormControl>
                  <FormLabel htmlFor="isPrivate" className="text-xs font-medium text-whitish">
                    Make Private
                  </FormLabel>
                </div>
                <VisuallyHidden asChild>
                  <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
                </VisuallyHidden>
              </FormItem>
            )}
          />
          {verifyAccess && (
            <FormField
              control={form.control}
              name="isVerified"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormDescription className="text-[10px] font-medium text-whitish mb-1">Verification</FormDescription>
                  <div className="flex items-center gap-2">
                    <FormControl className="relative">
                      <Checkbox
                        id="isPrivate"
                        className="rounded-[4px] border-input data-[state=checked]:text-brand "
                        checked={field.value}
                        disabled={form.formState.isSubmitting ? true : false}
                        onCheckedChange={() => field.onChange(!field.value)}
                      />
                    </FormControl>
                    <FormLabel htmlFor="isPrivate" className="text-xs font-medium text-whitish">
                      Verify
                    </FormLabel>
                  </div>
                  <VisuallyHidden asChild>
                    <FormMessage className="text-[10px] absolute -bottom-4 text-nowrap overflow-hidden w-full" />
                  </VisuallyHidden>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <Button variant="brand" size="brand" type="submit">
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant="close" size="brand" onClick={resetOnClose}>
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

export default MainForm;
