import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfilePicterMutation } from "@/components/Auth/api";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
interface ProfilePictureUpdateProps {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
}

export function ProfilePictureUpdate({
  profilePicture,
  firstName,
  lastName,
}: ProfilePictureUpdateProps) {
  const organizationData = useSelector((state: RootState) => state.auth.user);
  const [updateProfilePicture, { isLoading: isUploading }] =
    useUpdateProfilePicterMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to server
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      await updateProfilePicture(formData).unwrap();
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to update profile picture");
      console.error("Upload error:", error);
      // Revert preview on error
      setPreviewUrl(null);
    }
  };

  return (
    <div className="relative mb-4">
      <Avatar className="w-18 h-18 border-4 border-[var(--primary)]">
        <AvatarImage
          src={
            previewUrl || profilePicture || organizationData?.profile_picture
          }
          alt="Profile picture"
        />
        <AvatarFallback className="bg-[var(--secondary)] text-white text-xl">
          {firstName?.[0]}
          {lastName?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
      <Button
        size="icon"
        className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-secondary text-white w-8 h-8"
        onClick={handleProfilePictureClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
        <span className="sr-only">Change profile picture</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
}
