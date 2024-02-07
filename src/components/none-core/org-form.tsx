import { Button } from "@components/shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/shadcn/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus, PlusCircle, Trash } from "lucide-react";
import { useAccount } from "wagmi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/shadcn/form";
import { Input } from "@components/shadcn/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import Web from "@components/icons/web";
import Github from "@components/icons/github";
import Twitter from "@components/icons/twitter";
import Discord from "@components/icons/discord";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadcn/select";
import { chains } from "@/constants";
import { Checkbox } from "@components/shadcn/checkbox";
import { useToast } from "@components/shadcn/use-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  tooltip?: boolean;
}
const MAX_UPLOAD_SIZE = 1024 * 1024 * 1;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
// const chainValues = chains.map((chain) => chain.value) as const;
const formSchema = z.object({
  image: z
    .instanceof(File, { message: "Upload Img" })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), { message: "Only png, jpg, jpeg and webp supported" })
    .refine((file) => file.size < MAX_UPLOAD_SIZE, { message: "Image must be less than 3MB" })
    .optional(),
  orgname: z
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
    .max(10, {
      message: "Name must be maximum 10 characters",
    }),
  slug: z
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
  web: z.union([
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
  wallets: z
    .array(
      z.object({
        walletAddress: z
          .string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
          })
          .length(42, { message: "Address is required" })
          .startsWith("0x", { message: "Address must starts with 0x" })
          .regex(/^[a-zA-Z0-9]+$/, { message: "Incorrect wallet address" }),
        walletName: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          })
          .min(3, { message: "Minimum 3 characters" })
          .max(10, { message: "Maximum 10 characters" }),
        walletChain: z.string().min(1, { message: "Choose Chain" }),
      })
    )
    .max(5),
  isPrivate: z.boolean().default(true).optional(),
  isVerify: z.boolean().default(false).optional(),
});

function OrgForm({ tooltip = true }: IProps) {
  const { address } = useAccount();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",

    defaultValues: {
      orgname: "",
      slug: "",
      image: undefined,
      web: "",
      github: "",
      discord: "",
      twitter: "",
      wallets: [{ walletAddress: "", walletChain: "", walletName: "" }],
      isPrivate: true,
      isVerify: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "wallets",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const resetOnClose = () => {
    form.reset(form.formState.defaultValues);
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setOpen(false);
      form.reset(form.formState.defaultValues);
      navigate("/my-creations");

      toast({
        title: "Organization created",
        duration: 10000,
        variant: "createOrg",
      });
    }
  }, [form, form.formState, form.reset, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {tooltip ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0} className="cursor-pointer">
                <DialogTrigger asChild>
                  <Button variant="create" size="create" disabled={address === undefined && true}>
                    <PlusCircle className="mr-1 h-4 w-4" /> Create
                  </Button>
                </DialogTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent sideOffset={12} collisionPadding={5}>
              {address === undefined ? <p>You don’t have access</p> : <p>Create Organization</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DialogTrigger asChild>
          <Button variant="create" size="create" disabled={address === undefined && true}>
            <PlusCircle className="mr-1 h-4 w-4" /> Create
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className="bg-darkBlue px-2 sm:px-4 py-3 sm:py-6 rounded-xl gap-0 max-w-[580px] overflow-y-auto scrollbar scrollbar-thumb-foreground scrollbar-track-transparent max-h-[95%] "
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <VisuallyHidden asChild>
            <DialogTitle>Hidden</DialogTitle>
          </VisuallyHidden>
          <DialogDescription asChild></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 xs:space-y-5">
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <FormItem className="text-center ">
                    <Avatar className="mx-auto w-16 h-16 border-2 mb-3">
                      <AvatarImage className="w-full h-full object-cover" src={selectedImage ?? ""} />
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
                name="orgname"
                render={({ field, fieldState }) => (
                  <FormItem className="basis-2/4">
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
                name="slug"
                render={({ field, fieldState }) => (
                  <FormItem className="basis-2/4">
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
            <div className="flex justify-between xs:items-center gap-3  flex-col xs:flex-row w-full">
              <FormField
                control={form.control}
                name="web"
                render={({ field, fieldState }) => (
                  <FormItem className="basis-2/4">
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
                  <FormItem className="basis-2/4">
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
                  <FormItem className="basis-2/4">
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
                  <FormItem className="basis-2/4">
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
                <div key={item.id} className={`flex justify-between items-center gap-4 xs:gap-2 flex-row w-full ${index !== 0 ? "my-3" : "pb-3"}`}>
                  <div className="flex-grow flex gap-2 xs:gap-3 flex-col xs:flex-row xs:items-center">
                    <FormField
                      control={form.control}
                      name={`wallets.${index}.walletChain`}
                      render={({ field, fieldState }) => (
                        <FormItem className="basis-1/3">
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
                      name={`wallets.${index}.walletAddress`}
                      render={({ field, fieldState }) => (
                        <FormItem className="basis-1/3">
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
                      name={`wallets.${index}.walletName`}
                      render={({ field, fieldState }) => (
                        <FormItem className="basis-1/3">
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
                        className="w-8 h-8 xs:w-7 xs:h-7 p-0"
                        onClick={() => append({ walletAddress: "", walletChain: "", walletName: "" }, { shouldFocus: false })}
                      >
                        <Plus className="xs:w-4 xs:h-4" />
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
                render={({ field, fieldState }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="isVerify"
                render={({ field, fieldState }) => (
                  <FormItem>
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
      </DialogContent>
    </Dialog>
  );
}

export default OrgForm;
