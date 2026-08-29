"use client";

import * as React from "react";
import Image from "next/image";
import { Save, Users, Plus, Edit2, Trash2, Mail } from "lucide-react";
import { StudioProfile, TeamMember } from "@/lib/mock-data";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";
import { CharacterAvatar } from "@/components/character/character-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { isValidUrl, isValidEmail } from "@/lib/utils";
import {
  VGenIcon,
  FiverrIcon,
  DiscordIcon,
  ArtStationIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import { updateStudioProfile } from "@/actions/profile";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/actions/team";

interface AdminProfileClientViewProps {
  initialProfile: StudioProfile;
  initialTeam: TeamMember[];
}

export function AdminProfileClientView({
  initialProfile,
  initialTeam,
}: AdminProfileClientViewProps) {
  const { toast } = useToast();
  const { toggleMobile } = useAdminLayout();
  const [profile, setProfile] = React.useState<StudioProfile>(initialProfile);
  const [team, setTeam] = React.useState<TeamMember[]>(initialTeam);
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);

  // Profile error states
  const [characterNameError, setCharacterNameError] = React.useState<string | undefined>();
  const [vgenUrlError, setVgenUrlError] = React.useState<string | undefined>();
  const [fiverrUrlError, setFiverrUrlError] = React.useState<string | undefined>();
  const [discordUrlError, setDiscordUrlError] = React.useState<string | undefined>();
  const [emailError, setEmailError] = React.useState<string | undefined>();

  // Team Member Modal State
  const [memberModalOpen, setMemberModalOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = React.useState<TeamMember | null>(null);

  // Form fields for Team Member modal
  const [memberName, setMemberName] = React.useState("");
  const [memberNickname, setMemberNickname] = React.useState("");
  const [memberRole, setMemberRole] = React.useState("");
  const [memberBio, setMemberBio] = React.useState("");
  const [memberAvatar, setMemberAvatar] = React.useState("/images/ayamu-hamiru.jpg");
  const [memberSpecialties, setMemberSpecialties] = React.useState("");
  const [memberArtstation, setMemberArtstation] = React.useState("");
  const [memberX, setMemberX] = React.useState("");

  // Team member modal error states
  const [memberNameError, setMemberNameError] = React.useState<string | undefined>();
  const [memberRoleError, setMemberRoleError] = React.useState<string | undefined>();
  const [memberAvatarError, setMemberAvatarError] = React.useState<string | undefined>();
  const [memberArtstationError, setMemberArtstationError] = React.useState<string | undefined>();
  const [memberXError, setMemberXError] = React.useState<string | undefined>();

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberName("");
    setMemberNickname("");
    setMemberRole("");
    setMemberBio("");
    setMemberAvatar("/images/ayamu-hamiru.jpg");
    setMemberSpecialties("Illustration, Clip Studio Paint");
    setMemberArtstation("");
    setMemberX("");
    setMemberNameError(undefined);
    setMemberRoleError(undefined);
    setMemberAvatarError(undefined);
    setMemberArtstationError(undefined);
    setMemberXError(undefined);
    setMemberModalOpen(true);
  };

  const handleOpenEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberName(member.name);
    setMemberNickname(member.nickname);
    setMemberRole(member.role);
    setMemberBio(member.bio);
    setMemberAvatar(member.avatar);
    setMemberSpecialties(member.specialties.join(", "));
    setMemberArtstation(member.socials.artstation || "");
    setMemberX(member.socials.x || "");
    setMemberNameError(undefined);
    setMemberRoleError(undefined);
    setMemberAvatarError(undefined);
    setMemberArtstationError(undefined);
    setMemberXError(undefined);
    setMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!memberName.trim()) {
      setMemberNameError("Name is required.");
      hasError = true;
    } else {
      setMemberNameError(undefined);
    }

    if (!memberRole.trim()) {
      setMemberRoleError("Role is required.");
      hasError = true;
    } else {
      setMemberRoleError(undefined);
    }

    if (!memberAvatar.trim() || !isValidUrl(memberAvatar.trim())) {
      setMemberAvatarError("A valid image URL is required.");
      hasError = true;
    } else {
      setMemberAvatarError(undefined);
    }

    if (memberArtstation.trim() && !isValidUrl(memberArtstation.trim())) {
      setMemberArtstationError("Please enter a valid URL or leave blank.");
      hasError = true;
    } else {
      setMemberArtstationError(undefined);
    }

    if (memberX.trim() && !isValidUrl(memberX.trim())) {
      setMemberXError("Please enter a valid URL or leave blank.");
      hasError = true;
    } else {
      setMemberXError(undefined);
    }

    if (hasError) return;

    const specialtiesArr = memberSpecialties
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const socialsObj: Record<string, string> = {};
    if (memberArtstation.trim()) socialsObj.artstation = memberArtstation.trim();
    if (memberX.trim()) socialsObj.x = memberX.trim();

    if (editingMember) {
      const res = await updateTeamMember(editingMember.id, {
        name: memberName.trim(),
        nickname: memberNickname.trim() || undefined,
        role: memberRole.trim(),
        bio: memberBio.trim(),
        avatar: memberAvatar.trim(),
        specialties: specialtiesArr,
        socials: socialsObj,
      });

      if (!res.success) {
        toast({
          title: "Update Failed",
          description: res.error || "Failed to update team member.",
          type: "error",
        });
        return;
      }

      setTeam((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? {
                ...m,
                name: memberName.trim(),
                nickname: memberNickname.trim(),
                role: memberRole.trim(),
                bio: memberBio.trim(),
                avatar: memberAvatar.trim(),
                specialties: specialtiesArr,
                socials: socialsObj,
              }
            : m
        )
      );

      toast({
        title: "Team Member Updated",
        description: `Profile for "${memberName}" was successfully saved.`,
        type: "success",
      });
    } else {
      const res = await createTeamMember({
        name: memberName.trim(),
        nickname: memberNickname.trim() || undefined,
        role: memberRole.trim(),
        bio: memberBio.trim(),
        avatar: memberAvatar.trim(),
        specialties: specialtiesArr,
        socials: socialsObj,
      });

      if (!res.success || !res.member) {
        toast({
          title: "Creation Failed",
          description: res.error || "Failed to add team member.",
          type: "error",
        });
        return;
      }

      setTeam((prev) => [
        ...prev,
        {
          id: res.member!.id,
          name: res.member!.name,
          nickname: res.member!.nickname || "",
          role: res.member!.role,
          bio: res.member!.bio,
          avatar: res.member!.avatar,
          specialties: res.member!.specialties,
          socials: (res.member!.socials as Record<string, string>) || {},
        },
      ]);

      toast({
        title: "Team Member Added",
        description: `"${memberName}" was added to the studio team.`,
        type: "success",
      });
    }

    setMemberModalOpen(false);
  };

  const handleConfirmDeleteMember = async () => {
    if (!memberToDelete) return;
    const name = memberToDelete.name;
    const id = memberToDelete.id;
    setMemberToDelete(null);

    await deleteTeamMember(id);
    setTeam((prev) => prev.filter((m) => m.id !== id));

    toast({
      title: "Team Member Removed",
      description: `"${name}" was removed from the team roster.`,
      type: "info",
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!profile.characterName.trim()) {
      setCharacterNameError("Character name is required.");
      hasError = true;
    } else {
      setCharacterNameError(undefined);
    }

    if (profile.vgenUrl.trim() && !isValidUrl(profile.vgenUrl.trim())) {
      setVgenUrlError("Please enter a valid URL (e.g. https://vgen.co/...)");
      hasError = true;
    } else {
      setVgenUrlError(undefined);
    }

    if (profile.fiverrUrl.trim() && !isValidUrl(profile.fiverrUrl.trim())) {
      setFiverrUrlError("Please enter a valid URL (e.g. https://fiverr.com/...)");
      hasError = true;
    } else {
      setFiverrUrlError(undefined);
    }

    if (profile.discordUrl.trim() && !isValidUrl(profile.discordUrl.trim())) {
      setDiscordUrlError("Please enter a valid invite link (e.g. https://discord.gg/...)");
      hasError = true;
    } else {
      setDiscordUrlError(undefined);
    }

    if (profile.email.trim() && !isValidEmail(profile.email.trim())) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError(undefined);
    }

    if (hasError) {
      setTimeout(() => {
        const firstError = document.querySelector(".border-rose-500, [aria-invalid='true']");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          if (firstError instanceof HTMLElement && typeof firstError.focus === "function") {
            firstError.focus();
          }
        }
      }, 50);
      return;
    }

    setIsSavingProfile(true);
    const res = await updateStudioProfile({
      name: profile.name,
      tagline: profile.tagline,
      slogan: profile.slogan,
      characterName: profile.characterName,
      characterNickname: profile.characterNickname,
      characterBio: profile.characterBio,
      characterAvatar: profile.characterAvatar,
      vgenUrl: profile.vgenUrl,
      fiverrUrl: profile.fiverrUrl,
      discordUrl: profile.discordUrl,
      email: profile.email,
      xUrl: profile.xUrl,
      artstationUrl: profile.artstationUrl,
      stats: profile.stats,
    });
    setIsSavingProfile(false);

    if (!res.success) {
      toast({
        title: "Save Failed",
        description: res.error || "Failed to update studio profile.",
        type: "error",
      });
      return;
    }

    toast({
      title: "Profile Updated!",
      description: "Studio branding and character lore saved to live database.",
      type: "success",
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Studio Profile & Character Lore"
        subtitle="Manage Ayamu Hamiru character lore, social platform handles, and studio creative roster."
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-10 max-w-5xl w-full mx-auto pb-16">
          <form onSubmit={handleSaveProfile} noValidate className="space-y-8">
            {/* Section 1: Character Lore */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CharacterAvatar size="md" withBorder />
                <div>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    Studio Character: Ayamu Hamiru
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Official character identity representing Ayamu Labs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Character Full Name *
                  </label>
                  <Input
                    value={profile.characterName}
                    error={characterNameError}
                    onChange={(e) => {
                      setProfile({ ...profile, characterName: e.target.value });
                      if (characterNameError) setCharacterNameError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Short Nickname
                  </label>
                  <Input
                    value={profile.characterNickname}
                    onChange={(e) =>
                      setProfile({ ...profile, characterNickname: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Character Lore & Biography
                  </label>
                  <Textarea
                    rows={4}
                    value={profile.characterBio}
                    onChange={(e) =>
                      setProfile({ ...profile, characterBio: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Platform Links & Studio URLs */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                Studio Commission Channels & Socials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    VGen Commission Page
                  </label>
                  <Input
                    value={profile.vgenUrl}
                    error={vgenUrlError}
                    icon={<VGenIcon className="h-4 w-4 text-rose-500" />}
                    onChange={(e) => {
                      setProfile({ ...profile, vgenUrl: e.target.value });
                      if (vgenUrlError) setVgenUrlError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Fiverr Studio Profile
                  </label>
                  <Input
                    value={profile.fiverrUrl}
                    error={fiverrUrlError}
                    icon={<FiverrIcon className="h-4 w-4 text-emerald-500" />}
                    onChange={(e) => {
                      setProfile({ ...profile, fiverrUrl: e.target.value });
                      if (fiverrUrlError) setFiverrUrlError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Community Discord Invite
                  </label>
                  <Input
                    value={profile.discordUrl}
                    error={discordUrlError}
                    icon={<DiscordIcon className="h-4 w-4 text-indigo-500" />}
                    onChange={(e) => {
                      setProfile({ ...profile, discordUrl: e.target.value });
                      if (discordUrlError) setDiscordUrlError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Studio Inquiry Email
                  </label>
                  <Input
                    type="email"
                    value={profile.email}
                    error={emailError}
                    icon={<Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                    onChange={(e) => {
                      setProfile({ ...profile, email: e.target.value });
                      if (emailError) setEmailError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    X / Twitter Profile
                  </label>
                  <Input
                    value={profile.xUrl}
                    icon={<XIcon className="h-4 w-4 text-zinc-400" />}
                    onChange={(e) =>
                      setProfile({ ...profile, xUrl: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    ArtStation Studio Portfolio
                  </label>
                  <Input
                    value={profile.artstationUrl}
                    icon={<ArtStationIcon className="h-4 w-4 text-sky-500" />}
                    onChange={(e) =>
                      setProfile({ ...profile, artstationUrl: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Save Profile Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs sm:text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isSavingProfile ? "Saving..." : "Save Profile & Socials"}</span>
              </button>
            </div>
          </form>

          {/* Section 3: Studio Team Management */}
          <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-500" />
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Creative Team Roster ({team.length})
                </h3>
              </div>

              <button
                onClick={handleOpenAddMember}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-start justify-between p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-950 dark:text-white text-sm">
                        {member.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        {member.role}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 mt-1">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditMember(member)}
                      className="p-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
                      title="Edit Member"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setMemberToDelete(member)}
                      className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
                      title="Delete Member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Add / Edit Team Member Modal */}
      <Dialog
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        className="max-w-lg"
      >
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-950 dark:text-white">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </h3>
          <form onSubmit={handleSaveMember} noValidate className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Full Name *
              </label>
              <Input
                placeholder="e.g. Arifin N.H"
                value={memberName}
                error={memberNameError}
                onChange={(e) => {
                  setMemberName(e.target.value);
                  if (memberNameError) setMemberNameError(undefined);
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Nickname
              </label>
              <Input
                placeholder="e.g. Arifin"
                value={memberNickname}
                onChange={(e) => setMemberNickname(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Role & Title *
            </label>
            <Input
              placeholder="e.g. Founder & Art Director"
              value={memberRole}
              error={memberRoleError}
              onChange={(e) => {
                setMemberRole(e.target.value);
                if (memberRoleError) setMemberRoleError(undefined);
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Avatar Image URL *
            </label>
            <Input
              placeholder="https://..."
              value={memberAvatar}
              error={memberAvatarError}
              onChange={(e) => {
                setMemberAvatar(e.target.value);
                if (memberAvatarError) setMemberAvatarError(undefined);
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Specialties (comma-separated)
            </label>
            <Input
              placeholder="Illustration, Character Design, Concept Art"
              value={memberSpecialties}
              onChange={(e) => setMemberSpecialties(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Bio / Description
            </label>
            <Textarea
              rows={3}
              placeholder="Brief introduction about creative journey..."
              value={memberBio}
              onChange={(e) => setMemberBio(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                ArtStation URL
              </label>
              <Input
                placeholder="https://artstation.com/..."
                value={memberArtstation}
                error={memberArtstationError}
                onChange={(e) => {
                  setMemberArtstation(e.target.value);
                  if (memberArtstationError) setMemberArtstationError(undefined);
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                X / Twitter URL
              </label>
              <Input
                placeholder="https://x.com/..."
                value={memberX}
                error={memberXError}
                onChange={(e) => {
                  setMemberX(e.target.value);
                  if (memberXError) setMemberXError(undefined);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setMemberModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all cursor-pointer"
            >
              {editingMember ? "Save Member" : "Add Member"}
            </button>
          </div>
        </form>
        </div>
      </Dialog>

      {/* Delete Member Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={handleConfirmDeleteMember}
        title="Remove Team Member?"
        description={
          memberToDelete
            ? `Are you sure you want to remove "${memberToDelete.name}" from the studio team roster?`
            : ""
        }
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}