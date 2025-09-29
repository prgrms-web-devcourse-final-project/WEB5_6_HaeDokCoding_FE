'use client';

import Spinner from '@/shared/components/spinner/Spinner';
import WelcomeModal from '@/domains/login/components/WelcomeModal';
import { useLoginRedirect } from '../hook/useAuthHooks';

function LoginRedirectHandler() {
  const { loading, welcomeModalOpen, handleCloseWelcomeModal, user } = useLoginRedirect();

  if (loading) {
    return (
      <div className="page-layout max-w-824 flex-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* 첫 유저 모달 */}
      {user && (
        <WelcomeModal
          userNickname={user.nickname}
          open={welcomeModalOpen}
          onClose={handleCloseWelcomeModal}
        />
      )}
    </>
  );
}
export default LoginRedirectHandler;
