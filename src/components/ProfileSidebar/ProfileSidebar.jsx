
import "./ProfileSidebar.css";

function ProfileSidebar({
  isOpen,
  onClose,
  user,
  onEditProfile,
  onLogout,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="profile-sidebar">
        <button
          className="profile-sidebar__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img
          className="profile-sidebar__avatar"
          src={user?.avatar || "/default-avatar.png"}
          alt="User avatar"
        />
        <div className="profile-sidebar__name">{user?.name || "Profile"}</div>
        <button
  className="profile-sidebar__btn"
  onClick={() => {
    console.log("open modal");
    onEditProfile(); // Only this!
    // onClose(); // Remove or comment out!
  }}
>
  Change profile data
</button>

        <button
          className="profile-sidebar__btn profile-sidebar__btn--logout"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          Log out
        </button>
      </div>
      {/* Overlay to close when clicking outside */}
      <div className="profile-sidebar__overlay" onClick={onClose} />
    </>
  );
}

export default ProfileSidebar;
