import { getHotel } from "@/lib/hotel/demo-data";
import { buildRequestMessage, buildWhatsAppUrl } from "@/lib/hotel/requests";
import type { GuestRequestPayload } from "@/lib/hotel/types";
import { sendTelegramMessage } from "@/lib/telegram/client";
import { getTelegramChatId, isTelegramConfigured } from "@/lib/telegram/config";

export async function notifyHotelStaff(payload: GuestRequestPayload) {
  const hotel = getHotel(payload.hotelId);
  if (!hotel) {
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

  return { whatsappUrl, telegramSent };
}
