import { buildRequestMessage, buildWhatsAppUrl } from "@/lib/hotel/requests";
import { DEFAULT_HOTEL_ID, getHotelForRoom } from "@/lib/hotel/repository";
import type { GuestRequestPayload } from "@/lib/hotel/types";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import { sendTelegramMessage } from "@/lib/telegram/client";
import { getTelegramChatId, isTelegramConfigured } from "@/lib/telegram/config";

export async function notifyHotelStaff(payload: GuestRequestPayload) {
  const hotel = await getHotelForRoom(payload.room);

  if (payload.hotelId !== hotel.id && payload.hotelId !== DEFAULT_HOTEL_ID) {
    throw new Error("Hotel no encontrado");
  }

  const text = buildRequestMessage(payload, hotel.name);
  const whatsappUrl = buildWhatsAppUrl(hotel.receptionWhatsApp, text);

  let telegramSent = false;
  if (isTelegramConfigured()) {
    const chatId = getTelegramChatId();
    if (chatId) {
      await sendTelegramMessage(chatId, text.replace(/\*/g, ""));
      telegramSent = true;
    }
  }

  let saved = false;
  if (isSupabaseAdminConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("guest_requests").insert({
      hotel_id: hotel.id,
      room: payload.room,
      type: payload.type,
      message: payload.message ?? null,
      items: payload.items ?? null,
      status: "pending",
    });

    if (!error) {
      saved = true;
    }
  }

  return { whatsappUrl, telegramSent, saved };
}
